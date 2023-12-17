import { createTRPCRouter } from "~/server/api/trpc";
import { entityRouter } from "./routers/entity";
import { postRouter } from "~/server/api/routers/post";
import { relationshipTypeRouter } from "./routers/relationship-type";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  entity: entityRouter,
  relationshipType: relationshipTypeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
