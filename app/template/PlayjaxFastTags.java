package template;

import groovy.lang.Closure;
import play.exceptions.PlayException;
import play.templates.FastTags;
import play.templates.GroovyTemplate;
import play.templates.JavaExtensions;
import play.templates.TagContext;
import playjax.Playjax;

import java.io.PrintWriter;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

/**
 * Created by IntelliJ IDEA.
 * User: lars
 * Date: 9/8/11
 * Time: 10:21 PM
 * To change this template use File | Settings | File Templates.
 */

@FastTags.Namespace("playjax")
public class PlayjaxFastTags extends FastTags {

    public static void _extends(Map<?, ?> args, Closure body, PrintWriter out, GroovyTemplate.ExecutableTemplate template, int fromLine){
        //if(!Playjax.isJavascriptEnabled()){
        if (!Playjax.isAjaxRequest()){
            play.templates.FastTags._extends(args, body, out, template, fromLine);
        }
    }
}
