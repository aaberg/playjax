package playjax.plugins;

import play.Logger;
import play.PlayPlugin;
import play.mvc.Http;
import play.mvc.Scope;
import play.mvc.results.Redirect;
import play.mvc.results.Result;
import playjax.Playjax;

import java.lang.reflect.Method;

/**
 * Created by IntelliJ IDEA.
 * User: lars
 * Date: 9/5/11
 * Time: 2:45 PM
 * To change this template use File | Settings | File Templates.
 */
public class PlayjaxPlugin extends PlayPlugin {

    @Override
    public void detectChange() {
        super.detectChange();    //To change body of overridden methods use File | Settings | File Templates.

        String url = Http.Request.current().url;
        Http.Response.current().headers.put("playjax_location", new Http.Header("playjax_location", url));
    }
}
