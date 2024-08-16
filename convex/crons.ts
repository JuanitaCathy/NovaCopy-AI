import { cronJobs } from "convex/server";
import { setupWaitlistCrons } from "./waitlist/crons";

const crons = cronJobs();

setupWaitlistCrons(crons);

// ...your other crons, if any

export default crons;
