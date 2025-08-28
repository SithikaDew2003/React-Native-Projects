/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import hibernate.City;
import hibernate.HibernateUtil;
import hibernate.Users;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author sithi
 */
@WebServlet(name = "Signup", urlPatterns = {"/Signup"})
@MultipartConfig
public class Signup extends HttpServlet {

    private static final String UPLOAD_PATH="profile-image";
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String firstName = request.getParameter("firstName");
        String lastName = request.getParameter("lastName");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String confirmPassword = request.getParameter("confirmPassword");
        String city = request.getParameter("city");
        
        Part filePart = request.getPart("image");
        
        String appPath = getServletContext().getRealPath("");
        String newPath = appPath.replace("build\\web", "web\\resources\\profileImg");
        
        File uploadDir = new File(newPath);
        if (!uploadDir.exists()) {
            uploadDir.mkdir();
        }
        
        String fileName = System.currentTimeMillis()+"_profileImage.jpg";
        
        File profile = new File(uploadDir,fileName);
        Files.copy(filePart.getInputStream(), profile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        
        SessionFactory sf = HibernateUtil.getSessionFactory();
        Session s = sf.openSession();
        
        Criteria c = s.createCriteria(City.class);
        c.add(Restrictions.eq("id",Integer.valueOf(city)));
        City selectCity =(City)c.list().get(0);
        
        Users user = new Users();
        user.setFirst_name(firstName);
        user.setLast_name(lastName);
        user.setEmail(email);
        user.setPassword(password);
        user.setPath(fileName);
        user.setCity(selectCity);
        
        s.save(user);
        s.beginTransaction().commit();
        s.close();
    }

    

}
