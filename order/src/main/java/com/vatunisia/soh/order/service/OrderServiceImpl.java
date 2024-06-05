package com.vatunisia.soh.order.service;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.vatunisia.soh.order.dto.Consultation;
import com.vatunisia.soh.order.dto.OrderDTO;
import com.vatunisia.soh.order.entity.Order;
import com.vatunisia.soh.order.mapper.OrderMapper;
import com.vatunisia.soh.order.repo.OrderRepository;
import jakarta.ws.rs.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.apache.pdfbox.io.IOUtils;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class OrderServiceImpl implements OrderService {
    @Value("${order.directory}")
    private String reportDirectory;

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private SequenceGenerator sequenceGenerator;

    @Autowired
    private RestTemplate restTemplate;

    public OrderDTO saveOrderInDb(OrderDTO order) {
        // Check if the Consultation services list is null
        if (order.getConsultationServices() == null || order.getConsultationServices().isEmpty()) {
            throw new IllegalArgumentException("Consultation services cannot be null or empty.");
        }

        // Extract the selected businessId
        Integer businessId = order.getBusinessId();

        // Ensure that all consultations in the order belong to the same business
        for (Consultation consultation : order.getConsultationServices()) {
            if (!consultation.getBusinessId().equals(businessId)) {
                throw new IllegalArgumentException("All consultations in the order must belong to the same business.");
            }
        }

        // Calculate the total price of the order
        int totalPrice = 0;
        for (Consultation consultation : order.getConsultationServices()) {
            totalPrice += consultation.getPrice();
        }

        // Generate a new order ID
        String newOrderId = String.valueOf(sequenceGenerator.generateNextOrderId());

        // Create the Order object to be saved
        Order orderToBeSaved = new Order(newOrderId, order.getConsultationServices(), businessId, order.getPaymentMethod(), order.getContactNumber(), order.getEmail(), order.getName(), totalPrice);

        // Save the order to the database
        orderRepo.save(orderToBeSaved);

        // Map the saved Order object to OrderDTO and return
        return OrderMapper.mapToOrderDTO(orderToBeSaved, order.getConsultationServices());
    }

    public OrderDTO getOrderById(String id) {
        Order order = orderRepo.findById(id).orElse(null);
        if (order == null) {
            throw new NotFoundException("Order not found for id: " + id);
        }
        return convertToDto(order);
    }


    public List<OrderDTO> findAll() {
        List<Order> orders = orderRepo.findAll();
        List<OrderDTO> orderDTOs = new ArrayList<>();

        return orders.stream().map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public boolean deleteOrderById(String id) {
        if (orderRepo.existsById(id)) {
            orderRepo.deleteById(id);
            return true;
        }
        return false;
    }

    private OrderDTO convertToDto(Order order) {
        if (order == null) {
            throw new IllegalArgumentException("Order Null.");
        }
        //Business business = restTemplate.getForObject(
        //                "http://BUSINESS:9091/businesses/" + order.getBusinessId(),
        //                Business.class);

//        ResponseEntity<List<Consultation>> consultationResponse = restTemplate.exchange(
//                "http://CONSULTATION:9095/consultations" + order.getConsultationServices(),
//                HttpMethod.GET,
//                null,
//                new ParameterizedTypeReference<List<Consultation>>() {});

        ResponseEntity<List<Consultation>> consultationResponse = restTemplate.exchange(
                "http://CONSULTATION:9095/consultations?ids=" + buildConsultationIds(order.getConsultationServices()),
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Consultation>>() {
                });


        List<Consultation> consultations = consultationResponse.getBody();


        return OrderMapper.mapToOrderDTO(order, consultations);
    }

    private String buildConsultationIds(List<Consultation> consultations) {
        StringBuilder idsBuilder = new StringBuilder();
        for (Consultation consultation : consultations) {
            idsBuilder.append(consultation.getId()).append(",");
        }
        // Remove the trailing comma
        if (idsBuilder.length() > 0) {
            idsBuilder.deleteCharAt(idsBuilder.length() - 1);
        }
        return idsBuilder.toString();
    }



    @Override
    public ResponseEntity<String> generateReport(Map<String, Object> requestMap) {
        try {
            // Check if all required data is present in the request map
            if (!requestMap.containsKey("name") ||
                    !requestMap.containsKey("contactNumber") ||
                    !requestMap.containsKey("email") ||
                    !requestMap.containsKey("paymentMethod") ||
                    !requestMap.containsKey("consultationServices") ||
                    !requestMap.containsKey("total")) {
                return ResponseEntity.badRequest().body("Required data not found.");
            }

            // Ensure that the reportDirectory ends with a file separator
            if (!reportDirectory.endsWith(File.separator)) {
                reportDirectory += File.separator;
            }

            // Create the directory if it doesn't exist
            File directory = new File(reportDirectory);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Generate the file name
            String fileName = "Order_Report_" + System.currentTimeMillis() + ".pdf";
            String filePath = reportDirectory + fileName;

            // Create the PDF document
            Document document = new Document();
            PdfWriter.getInstance(document, new FileOutputStream(filePath));
            document.open();
/*
            String directoryPath = reportDirectory;
            String fileName = directoryPath + "\\" + "Order_Report_" + System.currentTimeMillis() + ".pdf";

            Document document = new Document();
            PdfWriter.getInstance(document, new FileOutputStream(fileName));
            document.open();
*/
            // Add title and details to the document
            Paragraph title = new Paragraph("Order Report");
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(20);
            document.add(title);

            addOrderDetails(document, requestMap);
            document.close();

            return ResponseEntity.ok().body(fileName);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to generate report: " + e.getMessage());
        }
    }



    private void addOrderDetails(Document document, Map<String, Object> requestMap) throws DocumentException {
        // Add order information
        document.add(new Paragraph("Order Information:"));
        document.add(new Paragraph("\nName: " + requestMap.get("name")));
        document.add(new Paragraph("Contact Number: " + requestMap.get("contactNumber")));
        document.add(new Paragraph("Email: " + requestMap.get("email")));
        document.add(new Paragraph("Payment Method: " + requestMap.get("paymentMethod")));
        document.add(new Paragraph("Total: " + requestMap.get("total")));

        // Add consultation services information
        document.add(new Paragraph("\nConsultation Services:\n\n"));
        List<Map<String, Object>> consultationServices = (List<Map<String, Object>>) requestMap.get("consultationServices");
        PdfPTable table = new PdfPTable(3);
        Stream.of("Service Name", "Service Description", "Price")
                .forEach(columnTitle -> {
                    PdfPCell header = new PdfPCell();
                    header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                    header.setBorderWidth(1);
                    header.setPhrase(new Phrase(columnTitle));
                    table.addCell(header);
                });
        for (Map<String, Object> service : consultationServices) {
            table.addCell(String.valueOf(service.get("name")));
            table.addCell(String.valueOf(service.get("description")));
            table.addCell(String.valueOf(service.get("price")));
        }
        document.add(table);
    }

    @Override
    public ResponseEntity<byte[]> getPdf(Map<String, Object> requestMap) {
        try {
            // Check if all required data is present in the request map
            if (!validateRequestMap(requestMap)) {
                return ResponseEntity.badRequest().body(new byte[0]);
            }

            // Generate PDF content
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, baos);
            document.open();

            // Add title to the document
            Paragraph title = new Paragraph("Order PDF");
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(20);
            document.add(title);

            // Add table header
            PdfPTable table = new PdfPTable(5);
            addTableHeader(table);

            // Add order details
            addRows(table, requestMap);

            // Add table to document
            document.add(table);

            // Set border for the document
            setBorderPdf(document);

            // Close the document
            document.close();

            // Convert the document to a byte array
            byte[] pdfBytes = baos.toByteArray();

            // Return the PDF byte array in the response entity
            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=Order.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfBytes);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new byte[0]);
        }
    }

    private byte[] getByteArray(String locationPath) throws Exception {
        File initialeFile = new File(locationPath);
        InputStream targetStream = new FileInputStream(initialeFile);
        byte[] byteArray = IOUtils.toByteArray(targetStream);
        targetStream.close();
        return byteArray;
    }
    private void addRows(PdfPTable table, Map<String, Object> data) {
        table.addCell((String) data.get("name"));
        table.addCell((String) data.get("business"));
        table.addCell((String) data.get("description"));
        table.addCell(Integer.toString((Integer) data.get("price")));
        table.addCell(Integer.toString((Integer) data.get("total")));
    }

    private void addTableHeader(PdfPTable table) throws DocumentException {
        Stream.of("Nom", "Business", "Description", "Price", "TTC")
                .forEach(columnTitle -> {
                    PdfPCell header = new PdfPCell();
                    header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                    header.setBorderWidth(1);
                    header.setPhrase(new Phrase(columnTitle));
                    header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                    header.setHorizontalAlignment(Element.ALIGN_CENTER);
                    header.setVerticalAlignment(Element.ALIGN_CENTER);
                    table.addCell(header);
                });
    }


    private Font getFont(String type) {
        switch (type) {
            case "header":
                Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLDOBLIQUE, 18, BaseColor.LIGHT_GRAY);
                headerFont.setStyle(Font.BOLD);
                return headerFont;
            case "data":
                Font dataFont = FontFactory.getFont(FontFactory.TIMES_ROMAN, 11, BaseColor.GRAY);
                dataFont.setStyle(Font.BOLD);
                return dataFont;
            default:
                return new Font();
        }

    }
    private void setBorderPdf(Document document) throws DocumentException {
        Rectangle rec = new Rectangle(577, 825, 18, 15);
        rec.enableBorderSide(1);
        rec.enableBorderSide(2);
        rec.enableBorderSide(4);
        rec.enableBorderSide(8);
        rec.setBorderColor(BaseColor.LIGHT_GRAY);
        rec.setBorderWidth(1);
        document.add(rec);
    }

    private boolean validateRequestMap(Map<String, Object> requestMap) {
        return requestMap.containsKey("name") &&
                requestMap.containsKey("business") &&
                requestMap.containsKey("description") &&
                requestMap.containsKey("price") &&
                requestMap.containsKey("total");
    }
}

