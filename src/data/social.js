import { 
  Github, 
  Linkedin, 
  Instagram, 
  MessageCircle, 
  Database,
  Mail,
  Code2,        
  MessagesSquare,
  Facebook,
  Rss
} from "lucide-react";

const socialData = [
  {
    name: "Github",
    icon: <Github size={22} />,
    link: "https://github.com/aryaabhii", 
  },
  {
    name: "LinkedIn",
    icon: <Linkedin size={22} />,
    link: "https://www.linkedin.com/in/abhijeet-kumar-9369a41a2/", 
  },
  {
    name: "Instagram",
    icon: <Instagram size={22} />,
    link: "https://www.instagram.com/abhijeet_9973/", 
  },
  {
    name: "Facebook",
    icon: <Facebook size={22} />,
    link: "https://www.facebook.com/abhijeet9973/", 
  },
  {
    name: "StackOverflow",
    icon: <Database size={22} />, 
    link: "https://stackoverflow.com/users/18514217/abhijeet-kumar", 
  },
  {
    name: "HackerRank",
    icon: <Code2 size={22} />, 
    link: "https://www.hackerrank.com/profile/aryaabhi84", 
  },
  {
    name: "Email",
    icon: <Mail size={22} />,
    link: "mailto:aryaabhi84@gmail.com", 
  },
  {
    name: "WhatsApp",
    icon: <MessageCircle size={22} />,
    link: "https://wa.me/919973278402", 
  },
//   {
//     name: "Discord",
//     icon: <MessagesSquare size={22} />,
//     link: "https://discord.com/users/aryaabhii", 
//   },
  {
    name: "Blogger",
    icon: <Rss size={22} />,
    link: "https://www.blogger.com/profile/01992207086554335159", 
  },

];

export default socialData;