package bdcis320.three;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import com.google.gson.Gson;



@WebServlet(name = "SurveyGet")
public class SurveyGet extends HttpServlet {
    protected String sha1(String input) throws NoSuchAlgorithmException {
        MessageDigest mDigest = MessageDigest.getInstance("SHA1");
        byte[] result = mDigest.digest(input.getBytes());
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < result.length; i++) {
            sb.append(Integer.toString((result[i] & 0xff) + 0x100, 16).substring(1));
        }

        return sb.toString();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        // Open the request for reading. Read in each line, put it into a string.
        String requestString = request.getParameter("email");

        // Declare our variables
        Connection conn = null;
        PreparedStatement stmt = null;

        try {
            conn = DBHelper.getConnection();

            String sql = "INSERT INTO survey (token, email) VALUES (?, ?);";

            stmt = conn.prepareStatement(sql);

            stmt.setString(1, sha1(requestString));
            stmt.setString(2, requestString);

            stmt.executeUpdate();

            out.println(requestString);
        } catch (Exception e) {
            System.out.println("oops");
        } finally {
            try { stmt.close(); } catch (Exception e) { System.out.println("oops"); }
            try { conn.close(); } catch (Exception e) { System.out.println("oops"); }
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Verify that token exists in database.
        PrintWriter out = response.getWriter();
        String token = request.getParameter("token");
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        String email = "";

        if (token.length() > 20) {
            token = token.substring(6);

            try {
                conn = DBHelper.getConnection();

                String sql = "SELECT email FROM survey WHERE token = ?";

                stmt = conn.prepareStatement(sql);
                stmt.setString(1, token);

                rs = stmt.executeQuery();

                while (rs.next()) {
                    email = rs.getString("email");
                }
            } catch (Exception e) {
                System.out.println("oops");
            } finally {
                try {
                    stmt.close();
                } catch (Exception e) {
                    System.out.println("oops");
                }
                try {
                    conn.close();
                } catch (Exception e) {
                    System.out.println("oops");
                }
            }
        }

        out.println(email);
    }
}