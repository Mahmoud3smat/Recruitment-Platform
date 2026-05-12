require("dotenv").config();

const connectDB = require("../config/db");
const TeamMember = require("../models/TeamMember");

const teamMembers = [
  {
    name: "Mahmoud Esmat",
    role: "Team Leader & Frontend Engineer",
    bio: "BSc in Electrical Engineering (ECE). Passionate about building scalable web applications.",
    isLeader: true,
    linkedin: "https://www.linkedin.com/in/mahmoud-esmat-120a0b24a",
    facebook: "https://www.facebook.com/share/1JK6kKge6a/",
    whatsapp: "https://wa.me/201012069129",
  },
  {
    name: "Mohamed Kamel",
    role: "Frontend Developer | Login & Register",
    bio: "Creates intuitive and beautiful user experiences with attention to every detail.",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    whatsapp: "https://wa.me/",
  },
  {
    name: "Amany Ahmed",
    role: "Frontend Developer | Jobs & Job details",
    bio: "Specializes in Node.js and database architecture. Loves building robust APIs.",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    whatsapp: "https://wa.me/201022280348",
  },
  {
    name: "Yasmin Medhat",
    role: "Frontend Developer | Company Dashboard",
    bio: "React enthusiast who builds pixel-perfect responsive interfaces.",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    whatsapp: "https://wa.me/",
  },
  {
    name: "Fawzia Yasser",
    role: "Frontend Developer | Seeker Dashboard",
    bio: "Comfortable across the entire stack. Bridges the gap between frontend and backend.",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    whatsapp: "https://wa.me/",
  },
];

const seedTeamMembers = async () => {
  try {
    await connectDB();

    await TeamMember.deleteMany();
    await TeamMember.insertMany(teamMembers);

    console.log("Team members data seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Team members seeding failed:", error.message);
    process.exit(1);
  }
};

seedTeamMembers();
