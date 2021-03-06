package com.sjtu.jpw.Controller;
import com.sjtu.jpw.Domain.User;
import com.sjtu.jpw.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.Date;


@Controller
@RequestMapping("/hibernate")
public class UserRepositoryController {
    @Autowired
    private UserRepository userRepository;

    @RequestMapping("saveUser")
    @ResponseBody
    public String saveUser() {
        User u = new User();
        u.setUserId(5);
        u.setUsername("李小狼");
        u.setPassword("123456");
        u.setGender("男");
        u.setNickname("阿贾克斯");
        long time = System.currentTimeMillis();
        java.sql.Date date = new java.sql.Date(time);
        u.setBirthday(date);
        u.setEmail("1111@qq.com");
        u.setPhone("18817716520");
        userRepository.save(u);
        return "asdsa";
    }

    /**
     * @param userId
     * @return
     */
    @RequestMapping("findUser")
    @ResponseBody
    public void findUserbyId(String userId) {
       User user= userRepository.findByUserId(Integer.parseInt(userId,10));
        System.out.println(user.getNickname());
    }

    /**
     * @param name
     * @return
     */
    @RequestMapping("findUserbyNickname")
    @ResponseBody
    public void findUserbyNickname(String name) {
       // User user= userRepository.findAllByNickname(name);
   //     System.out.println(user.getNickname());
    }
}
