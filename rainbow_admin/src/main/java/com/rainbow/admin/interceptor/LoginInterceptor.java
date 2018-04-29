package com.rainbow.admin.interceptor;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.util.StringUtils;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class LoginInterceptor extends HandlerInterceptorAdapter {

	// preHandle() : 컨트롤러보다 먼저 수행되는 메서드
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    	
    	System.out.println("interceptor!!!");
        // session 객체를 가져옴
        HttpSession session = request.getSession();
        HashMap<String,Object> member = (HashMap<String,Object>)session.getAttribute("admin_member");
        
        boolean ajax = "XMLHttpRequest".equals(request.getHeader("X-Requested-With"));
    	if(StringUtils.isEmpty(member)){
    		
    		if(ajax){
    			//response.setStatus(300);
    			response.sendError(300);
    		}else{
    			
    			String loginUrl = "/";
    			
//    			if(!StringUtils.isEmpty(request.getRequestURI())){
//    				if(!StringUtils.isEmpty(request.getQueryString())){
//    					loginUrl += "?" + request.getRequestURI() +"?"+ request.getQueryString();
//                	}else {
//                		loginUrl += "?" + request.getRequestURI();
//                	}
//    				
//    			}
            	response.sendRedirect(loginUrl);
    		}
    		return false;
        }
        // preHandle의 return은 컨트롤러 요청 uri로 가도 되냐 안되냐를 허가하는 의미임
        // 따라서 true로하면 컨트롤러 uri로 가게 됨.
        return true;
    }
    // 컨트롤러가 수행되고 화면이 보여지기 직전에 수행되는 메서드
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        // TODO Auto-generated method stub
        super.postHandle(request, response, handler, modelAndView);
    }

}
