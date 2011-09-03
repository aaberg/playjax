package controllers.playjax;

import play.mvc.Before;
import play.mvc.Controller;
import play.mvc.Http;

/**
 * Created by IntelliJ IDEA.
 * User: lars
 * Date: 9/3/11
 * Time: 10:27 PM
 * To change this template use File | Settings | File Templates.
 */
public class PlayjaxController extends Controller {

    @Before
    public static void addPlayjaxLocationHeader(){
        String location = request.url;
        response.headers.put("playjax_location", new Http.Header("playjax_location", location));
    }
}
