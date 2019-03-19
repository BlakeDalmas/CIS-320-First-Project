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

@WebServlet(name = "NameListEdit")
public class NameListEdit extends HttpServlet {
    private final static Logger log = Logger.getLogger(PersonDAO.class.getName());

    private boolean fieldsValid(String[] fields, Pattern[] checks) {
        for (int i = 0; i < fields.length; i++) {
            String field = fields[i];
            Pattern check = checks[i];

            Matcher m = check.matcher(field);

            boolean result = m.find();

            if (!result) {
                return false;
            }
        }

        return true;
    }

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

        // Declare our variables
        Connection conn = null;
        PreparedStatement stmt = null;

        String[] fields = {
            jsonPerson.getFirst(),
            jsonPerson.getLast(),
            jsonPerson.getEmail(),
            jsonPerson.getPhone(),
            jsonPerson.getBirthday()
        };

        Pattern[] checks = {
            Pattern.compile("^\\S{1,40}$"),
            Pattern.compile("^\\S{1,40}$"),
            Pattern.compile("^[\\.a-zA-Z0-9_]+@[\\.a-zA-Z_]+\\.[a-zA-Z_]{2,3}$"),
            Pattern.compile("^\\d{10}$|^\\d{3}-\\d{3}-\\d{4}$"),
            Pattern.compile("^\\d{4}\\-([0][1-9]|[1][0-2])\\-([0][1-9]|[1-2][0-9]|[3][0-2])$")
        };

        if (fieldsValid(fields, checks)) {
            try {
                conn = DBHelper.getConnection();

                String sql = "INSERT INTO person (first, last, email, phone, birthday) VALUES (?, ?, ?, ?, ?);";

                stmt = conn.prepareStatement(sql);

                for (int i = 0; i < fields.length; i++) {
                    stmt.setString(i + 1, fields[i]);
                }

                stmt.executeUpdate();

                //out.println("{\"success\" : true}");
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
}