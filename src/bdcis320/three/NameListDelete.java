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
import java.util.Enumeration;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.google.gson.Gson;

@WebServlet(name = "NameListDelete")
public class NameListDelete extends HttpServlet {
    private final static Logger log = Logger.getLogger(PersonDAO.class.getName());

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        // Open the request for reading. Read in each line, put it into a string.
        java.io.BufferedReader in = request.getReader();
        String requestString = new String();
        for (String line; (line = in.readLine()) != null; requestString += line);

        // Convert to Business Object.
        Gson gson = new Gson();
        Person jsonPerson = gson.fromJson(requestString, Person.class);

        Connection conn = null;
        PreparedStatement stmt = null;

        try {
            conn = DBHelper.getConnection();

            String sql = "DELETE FROM person WHERE id = ?";

            stmt = conn.prepareStatement(sql);

            stmt.setInt(1, jsonPerson.getId());

            stmt.executeUpdate();

            out.print(requestString);
        } catch (SQLException se) {
            log.log(Level.SEVERE, "SQL Error", se);
        } catch (Exception e) {
            log.log(Level.SEVERE, "Error", e);
        } finally {
            try {
                stmt.close();
            } catch (Exception e) {
                log.log(Level.SEVERE, "Error", e);
            }
            try {
                conn.close();
            } catch (Exception e) {
                log.log(Level.SEVERE, "Error", e);
            }
        }
    }
}
