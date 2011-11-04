package playjax;

import play.Play;
import play.mvc.Http;
import play.mvc.Scope;

/**
 * Created by IntelliJ IDEA.
 * User: lars
 * Date: 9/5/11
 * Time: 11:16 PM
 * To change this template use File | Settings | File Templates.
 */
public class Playjax {

    public static String ASYNC_KEY = "playjax_isajax";

    private Playjax(){

    }

    private static boolean isEnabled(){
        Object val = Play.configuration.get("playjax.enabled");

        if (val == null){
            return true;
        }
        else{
            return ((String)val).toLowerCase().equals("true");
        }
    }

    public static boolean isAjaxRequest(){
        return Http.Request.current().headers.containsKey(ASYNC_KEY);
    }

}
