let Vendor = require("../modules/vendor_modules");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
const env = require("dotenv");
const { error } = require("console");
env.config();
let secretKey = process.env.WhatIsYourName;

let vendorRegister = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const vendorEmail = await Vendor.findOne({ email });
        if (vendorEmail) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword
        });
        await newVendor.save();
        res.status(201).json({ message: "Vendor registered successfully" });
        console.log("Vendor registered");
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        console.error("Registration error:", error);
    }
};

let vendorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        let vendor = await Vendor.findOne({ email });
        if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        let token = jwt.sign({ vendorId: vendor._id }, secretKey, { expiresIn: "1h" });
        const vendorId=vendor._id
        res.status(200).json({ success: "Login success", token,vendorId });
        console.log(email, "this is token:", token,vendorId);
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

let getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find().populate("firm");
        res.json({ vendors });
    } catch (error) {
        console.error("Fetch vendors error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const getVendorById = async (req, res) => {
    const vendorId = req.params.id;
    try {
        const vendor = await Vendor.findById(vendorId).populate("firm");
        
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }
        
        const vendorFirmid = Array.isArray(vendor.firm) && vendor.firm.length > 0 
            ? vendor.firm[0]._id 
            : null;

        if (!vendorFirmid) {
            return res.status(404).json({ error: "Vendor firm not found" });
        }

        res.status(200).json({ vendorId, vendorFirmid, vendor });
        console.log(vendorFirmid);
    } catch (error) {
        console.error("Fetch vendorById error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = { vendorRegister, vendorLogin, getAllVendors,getVendorById };
