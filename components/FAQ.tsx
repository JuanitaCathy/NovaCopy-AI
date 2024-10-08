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
    question: "What is the difference between Copywriting and Content Writing",
    answer:
      "Copywriting and content writing are distinct forms of writing, each serving a unique purpose. While content writing focuses on informing and educating, copywriting aims to persuade and drive action. NovaCopy AI, our AI-powered copywriting assistant, is designed to excel in the art of persuasion. By understanding the nuances of copywriting, NovaCopy AI can help you craft compelling messages that resonate with your audience and drive conversions.",
  },
  {
    id: 2,
    question: "What is NovaCopy AI?",
    answer:
      "NovaCopy AI is an advanced artificial intelligence platform designed to streamline the content creation process for businesses of all sizes. By leveraging cutting-edge technology, our tool generates high-quality, tailored copy in a matter of seconds.",
  },
  {
    id: 3,
    question: "How does NovaCopy AI work?",
    answer:
      'Sign up by clicking <a href="https://www.novacopyai.xyz/" target="_blank" rel="noopener noreferrer">here</a>. Fill up the form by simply providing essential details about your business and target audience, and our AI generates tailored copy options. You can ask for further edits of the copy to meet your needs.',
  },
  {
    id: 4,
    question: "What kinda content can NovaCopy AI generate?",
    answer:
      "NovaCopy AI specializes in crafting compelling copy for various marketing channels, including email campaigns and advertising. Our tool excels at developing persuasive and engaging content that resonates with your target audience.",
  },
  {
    id: 5,
    question: "Is NovaCopy AI easy to use?",
    answer:
      "Yes, NovaCopy AI has been designed with user-friendliness in mind. Its intuitive interface ensures a seamless experience for users of all technical backgrounds.",
  },
  {
    id: 6,
    question: "Do I need any technical skills to use NovaCopy AI?",
    answer:
      "No technical expertise is required to utilize NovaCopy AI. Our platform is designed to be accessible to users of all skill levels.",
  },
  {
    id: 7,
    question: "Is my data safe with NovaCopy AI?",
    answer:
      "We prioritize data security and privacy. Your information is handled with the utmost care and is protected by robust security measures. Rest assured, your data remains confidential.",
  },
  {
    id: 8,
    question: "Can I get a refund?",
    answer:
      'We offer a refund policy for eligible customers. Please review our <a href="https://www.novacopyai.xyz/pricing" target="_blank" rel="noopener noreferrer">refund policy</a> for detailed information and eligibility criteria.',
  },
  {
    id: 9,
    question: "What should I do if I encounter a problem with NovaCopy AI?",
    answer:
      'Our well-trained AI customer support bot is available 24/7 to assist you with any issues or inquiries. If you would like to speak to a representative, please contact us through our <a href="mailto:novacopyaicustomerservice@gmail.com">email</a>.',
  },
  {
    id: 10,
    question: "How does the AI understand my brand voice?",
    answer:
      "NovaCopy AI is designed to capture the essence of your brand. By analyzing your existing content and incorporating user-defined style guidelines, our AI learns to replicate your unique brand voice. This ensures that all generated content aligns seamlessly with your brand identity and messaging.",
  },
  {
    id: 11,
    question: "Can NovaCopy AI write different types of content?",
    answer:
      "Yes, NovaCopy AI is capable of generating a wide range of content formats, including social media posts, email campaigns, website copy, and advertising materials. Our versatile platform adapts to your specific needs and delivers tailored content solutions.",
  },
  {
    id: 12,
    question: "How is NovaCopy AI different from Chat GPT?",
    answer:
      "Unlike general-purpose language models, NovaCopy AI is specifically trained on industry-relevant data. This ensures that the generated content is accurate, informative, and aligned with your brand identity. With NovaCopy AI, you can easily create engaging and persuasive content that resonates with your target audience.",
  },
];

const FAQSection = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="p-6">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} className="pr-2">
          {faqItems.slice(0, 6).map((item) => (
            <Accordion
              key={item.id}
              expanded={expanded === `panel${item.id}`}
              onChange={handleChange(`panel${item.id}`)}
              className={`bg-transparent border rounded-xl mb-4 max-w-[500px] mx-auto transition-all duration-300 ${
                expanded === `panel${item.id}`
                  ? "border-[#00b4d8] shadow-lg"
                  : "border-white/40"
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
                <Typography
                  component="div"
                  sx={{
                    "& a": {
                      textDecoration: "underline",
                      color: "inherit",
                    },
                  }}
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>

        <Grid item xs={12} md={6} className="pl-2">
          {faqItems.slice(6).map((item) => (
            <Accordion
              key={item.id}
              expanded={expanded === `panel${item.id}`}
              onChange={handleChange(`panel${item.id}`)}
              className={`bg-transparent border rounded-xl mb-4 max-w-[500px] mx-auto transition-all duration-300 ${
                expanded === `panel${item.id}`
                  ? "border-[#00b4d8] shadow-lg"
                  : "border-white/40"
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
                <Typography
                  component="div"
                  sx={{
                    "& a": {
                      textDecoration: "underline",
                      color: "inherit",
                    },
                  }}
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default FAQSection;
