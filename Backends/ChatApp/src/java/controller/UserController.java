package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.Users;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import util.HibernateUtil;

@MultipartConfig
@WebServlet(name = "UserController", urlPatterns = {"/UserController"})
public class UserController extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String firstName = request.getParameter("firstName");
        String lastName = request.getParameter("lastName");
        String countryCode = request.getParameter("countryCode");
        String contactNo = request.getParameter("contactNo");
        Part profileImage = request.getPart("profileImage");

//        System.out.println(firstName);
//        System.out.println(lastName);
//        System.out.println(countryCode);
//        System.out.println(contactNo);
//        System.out.println(profileImage);
        Gson gson = new Gson();
        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", Boolean.FALSE);

        if (firstName.isEmpty()) {
            responseObject.addProperty("message", "First Name is required");
        } else if (lastName.isEmpty()) {
            responseObject.addProperty("message", "Last Name is required");
        } else if (countryCode.isEmpty()) {
            responseObject.addProperty("message", "Country Code is required");
        } else if (contactNo.isEmpty()) {
            responseObject.addProperty("message", "Contact No is required");
        } else if (profileImage == null) {
            responseObject.addProperty("message", "Image is required");
        } else {
            Session s = HibernateUtil.getSessionFactory().openSession();
            Criteria c1 = s.createCriteria(Users.class);
            c1.add(Restrictions.eq("countryCode", countryCode));
            c1.add(Restrictions.eq("contactNo", contactNo));
            Users users = (Users) c1.uniqueResult();

            if (users != null) {
                responseObject.addProperty("message", "Contact no already exists");
            } else {
                users = new Users(firstName, lastName, countryCode, contactNo);
                users.setCreatedAt(new Date());
                users.setUpdatedAt(new Date());
                int id = (int) s.save(users);
                s.beginTransaction().commit();
                s.close();

                responseObject.add("users", gson.toJsonTree(users));

                String appPath = getServletContext().getRealPath(""); // application path in the server

                String newPath = appPath.replace("build" + File.separator + "web", "web" + File.separator + "profile-images");

                File profileFolder = new File(newPath, String.valueOf(id));
                profileFolder.mkdirs();

                File file1 = new File(profileFolder, "profile1.png");
                Files.copy(profileImage.getInputStream(), file1.toPath(), StandardCopyOption.REPLACE_EXISTING);

                responseObject.addProperty("status", true);
            }
        }
        response.setContentType("application/json");
        String toJson = gson.toJson(responseObject);
        response.getWriter().write(toJson);
    }

}
