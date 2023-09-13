import mongoose from "mongoose";

const companySchema = mongoose.Schema({
    sourceCodeintroduct: {
        type: String,
        default: "phần giới thiếu"
    },sourceCodeMap: {
        type: String,
        default: "phần map"
    },sourceCodeCertificate: {
        type: String,
        default: "phần chứng chỉ"
    },
    phoneNumber:{
        type: String,
        default: "0963652568"
    },
    address: {
        type: String,
        default: "phần địa chỉ"
    },
    email: {
        type: String,
        default: "email@gmail.com"
    },
    logo: {
        type: String,
        default: "https://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/company-logo/3f6f5f0d1eb2fbaba591792776c83fcf.jpeg"
    },
    socialMedia: {
        type: [{
          name: {
            type: String,
            default: 'fb'
          },
          link: {
            type: String,
            default: 'facebook.com'
          },
          icon: {
            type: String,
            default: 'https://cdn-icons-png.flaticon.com/512/2175/2175193.png'
          }
        }],
        default: []
      }
},{timestamps: true});

export default mongoose.model('Company',companySchema);