package com.rainbow.admin.util;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Iterator;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

public class FileUploadUtil {
	/**
	 * 파일 서버 저장
	 * @param req
	 * @return
	 */
	public static HashMap<String, Object> fileUpload(String defaultPath,HttpServletRequest req, String attachFolder){
		HashMap<String, Object> fileMap = new HashMap<String, Object>();
		String attachPath = File.separator + attachFolder + File.separator + StringTool.getNowDate("MM") + File.separator;
		String savePath = defaultPath + attachPath;
		String dbSavePath = File.separator + "upload" + attachPath;
		
		MultipartHttpServletRequest multipart = (MultipartHttpServletRequest) req;
		Iterator<String> iter = multipart.getFileNames();
		
		File directory = new File(savePath);
		if(!directory.exists()) {
			directory.mkdirs();
		}
		
		String filedName = "";
		MultipartFile mfile = null;
		String origName = "";
		String type = "";
		File serverFile;
		while (iter.hasNext()) {
			filedName = iter.next();
			mfile = multipart.getFile(filedName);
			String[] info = mfile.getContentType().split("/");
			try {
				origName = new String(mfile.getOriginalFilename().getBytes("8859_1"), "UTF-8");
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} //한글깨짐 방지
			
			if(info.length == 2) {
				type = info[0];
			}
			
			try {
				if(type.equals("image")) {
					String ext = origName.substring(origName.lastIndexOf('.'));		//원본파일 확장자
					String saveFileName = StringTool.getUuid() + ext;				//저장될 이름
//						Integer fileSize = (int) mfile.getSize();						//파일사이즈
					
					//설정한 path에 파일저장
					serverFile = new File(savePath + saveFileName);
					mfile.transferTo(serverFile);
					
					fileMap.put(filedName, dbSavePath + saveFileName);
					fileMap.put("result","success");
				}
			}catch(Exception e) {
				fileMap.put("result","fail");
			}
		}
		
		return fileMap;
	}
}
