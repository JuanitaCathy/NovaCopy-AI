"use client";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useState } from "react";

const faqItems = [
  {
    id: 1,
    question: "What is NovaCopy AI?",
    answer:
      "NovaCopy AI is an advanced artificial intelligence platform designed to streamline the content creation process for businesses of all sizes. By leveraging cutting-edge technology, our tool generates high-quality, tailored copy in a matter of seconds.",
  },
  {
    id: 2,
    question: "How does NovaCopy AI work?",
    answer:
      "Sign up by clicking here. Fill up the form by simply providing essential details about your business and target audience, and our AI generates tailored copy options. You can ask for further edits of the copy to meet your needs.",
  },
  {
    id: 3,
    question: "What kinda content can NovaCopy AI generate?",
    answer:
      "NovaCopy AI specializes in crafting compelling copy for various marketing channels, including email campaigns and advertising. Our tool excels at developing persuasive and engaging content that resonates with your target audience.",
  },
  {
    id: 4,
    question: "Is NovaCopy AI easy to use?",
    answer:
      "Yes, NovaCopy AI has been designed with user-friendliness in mind. Its intuitive interface ensures a seamless experience for users of all technical backgrounds.",
  },
  {
    id: 5,
    question: "Do I need any technical skills to use NovaCopy AI?",
    answer:
      "No technical expertise is required to utilize NovaCopy AI. Our platform is designed to be accessible to users of all skill levels.",
  },
  {
    id: 6,
    question: "Is my data safe with NovaCopy AI?",
    answer:
      "We prioritize data security and privacy. Your information is handled with the utmost care and is protected by robust security measures. Rest assured, your data remains confidential.",
  },
  {
    id: 7,
    question: "Can I get a refund?",
    answer:
      "We offer a refund policy for eligible customers. Please review our refund policy for detailed information and eligibility criteria.",
  },
  {
    id: 8,
    question: "What should I do if I encounter a problem with NovaCopy AI?",
    answer:
      "Our well-trained AI customer support bot is available 24/7 to assist you with any issues or inquiries. If you would like to speak to a representative, please contact us through our email: [email].",
  },
  {
    id: 9,
    question: "How does the AI understand my brand voice?",
    answer:
      "NovaCopy AI is designed to capture the essence of your brand. By analyzing your existing content and incorporating user-defined style guidelines, our AI learns to replicate your unique brand voice. This ensures that all generated content aligns seamlessly with your brand identity and messaging.",
  },
  {
    id: 10,
    question: "Can NovaCopy AI write different types of content?",
    answer:
      "Yes, NovaCopy AI is capable of generating a wide range of content formats, including social media posts, email campaigns, website copy, and advertising materials. Our versatile platform adapts to your specific needs and delivers tailored content solutions.",
  },
];

const FAQSection = () => {
  // State to keep track of the expanded FAQ item
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    // If the panel is expanded, close it; otherwise, open the new panel and close the previous one
    setExpanded(isExpanded ? (expanded === panel ? false : panel) : false);
  };

  return (
    <div className="p-6">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} className="pr-2">
          {faqItems.slice(0, 5).map((item) => (
            <Accordion
              key={item.id}
              expanded={expanded === `panel${item.id}`}
              onChange={handleChange(`panel${item.id}`)}
              className={`bg-transparent border border-white/[0.4] rounded-xl mb-4 max-w-[500px] mx-auto ${
                expanded === `panel${item.id}` ? "border-[#00b4d8] shadow-lg" : "border-white"
              }`} 

            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                aria-controls={`panel${item.id}-content`}
                id={`panel${item.id}-header`}
                className="text-white"
              >
                <Typography variant="h6" className="font-semibold">
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="text-white">
                <Typography>{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>

        <Grid item xs={12} md={6} className="pl-2">
          {faqItems.slice(5).map((item) => (
            <Accordion
            key={item.id}
            expanded={expanded === `panel${item.id}`}
            onChange={handleChange(`panel${item.id}`)}
            className={`bg-transparent border border-white/[0.4] rounded-xl mb-4 max-w-[500px] mx-auto ${
                expanded === `panel${item.id}` ? "border-[#00b4d8] shadow-lg" : "border-white"
            }`} // Apply pink glow border if expanded

          >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                aria-controls={`panel${item.id}-content`}
                id={`panel${item.id}-header`}
                className="text-white"
              >
                <Typography variant="h6" className="font-semibold">
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="text-white">
                <Typography>{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default FAQSection;
