package com.example.demo.controller;

import com.example.demo.config.JwtUtil;
import com.example.demo.model.Transaction;
import com.example.demo.model.User;
import com.example.demo.repository.TransactionRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    public AuthController(JwtUtil jwtUtil, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    //  Add a transaction (uses authenticated email)
    @PostMapping("/transactions")
    public ResponseEntity<?> addTransaction(@RequestBody Map<String, Object> payload) {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String type = (String) payload.get("type");
        Number amountNum = (Number) payload.get("amount");
        int amount = amountNum.intValue();

        transactionRepository.save(new Transaction(email, type, amount));

        return ResponseEntity.ok("Transaction saved!");
    }

    //  Fetch all transactions for the authenticated user
    @GetMapping("/transactions")
    public ResponseEntity<?> getAllTransactions() {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Transaction> transactions = transactionRepository.findByEmail(email);
        return ResponseEntity.ok(transactions);
    }

    //  Get account summary for authenticated user
    @GetMapping("/account")
    public ResponseEntity<?> getAccount() {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Transaction> allTransactions = transactionRepository.findByEmail(email);

        List<Integer> credits = new ArrayList<>();
        List<Integer> debits = new ArrayList<>();
        int balance = 0;

        for (Transaction txn : allTransactions) {
            if (txn.getType().equalsIgnoreCase("credit")) {
                credits.add(txn.getAmount());
                balance += txn.getAmount();
            } else if (txn.getType().equalsIgnoreCase("debit")) {
                debits.add(txn.getAmount());
                balance -= txn.getAmount();
            }
        }
        Optional<User> user = userRepository.findByEmail(email);
        
   
        Map<String, Object> accountData = new HashMap<>();
        accountData.put("email", email);
        accountData.put("balance", balance);
        accountData.put("credits", credits);
        accountData.put("debits", debits);
        accountData.put("name", user.map(User::getName).orElse("User"));

        return ResponseEntity.ok(accountData);
    }

    //  Registration remains public
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User newUser) {
        Optional<User> existingUser = userRepository.findByEmail(newUser.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(400).body("Email is already registered");
        }
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        userRepository.save(newUser);
        return ResponseEntity.ok("User registered successfully!");
    }

    //  Login remains public
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                String token = jwtUtil.generateToken(user.getEmail());
                Map<String, String> response = new HashMap<>();
                response.put("token", token);
                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(401).body("Invalid email or password");
    }
}
