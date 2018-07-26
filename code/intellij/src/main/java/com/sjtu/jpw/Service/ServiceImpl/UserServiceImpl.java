package com.sjtu.jpw.Service.ServiceImpl;

import com.sjtu.jpw.Domain.User;
import com.sjtu.jpw.Repository.UserRepository;
import com.sjtu.jpw.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> login(String username, String password) {
        return userRepository.findAllByUsernameAndPassword(username,password);
    }

    @Override
    public User userInfo(Integer userId) {
        return userRepository.findByUserId(userId);
    }

    @Override
    public User register(User newUser) {
        if(UsernameDuplicated(newUser.getUsername())==0){
            return userRepository.save(newUser);
        }
        else return null;
    }

    @Override
    public void updateInfo(User updateUser) {
        userRepository.updateInfo(
                updateUser.getPassword(),
                updateUser.getGender(),
                updateUser.getBirthday(),
                updateUser.getNickname(),
                updateUser.getPhone(),
                updateUser.getEmail(),
                updateUser.getState(),
                updateUser.getUserId()
        );
    }

    @Override
    public Integer UsernameDuplicated(String username) {
        List<User> users= userRepository.findAllByUsername(username);
        if(users.size()>0){return 1;}
        else return 0;
    }

    @Override
    public List<User> allUsers(){
        return userRepository.findAll();
    }
}
