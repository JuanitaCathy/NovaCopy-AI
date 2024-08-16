import { cron } from "convex/server";

export const cronJobs = {
  // Define your cron jobs here
  myCronJob: cron("0 * * * *", async ({ db }) => {
    // Your cron job logic here
  }),
};

export default cronJobs;
