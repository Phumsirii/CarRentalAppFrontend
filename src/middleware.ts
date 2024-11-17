export {default} from "next-auth/middleware";

export const config={
    // API routes protecting
    matcher:["/reservations/manage"]
}