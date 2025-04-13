// import {Router} from 'express'
// import { isAdminRoute, protectRoute } from "../middleware/authMiddleware.js";
// import { activateUserProfile, deleteUserProfile, getNotificationsList, getTeamList, getUserData, markNotificationRead, registerUserTask, updateUserProfile } from '../controllers/user.controller.js'

// const userRoute = Router()

// userRoute.get('/data', getUserData)
// userRoute.get("/get-team", protectRoute, isAdminRoute, getTeamList);
// userRoute.get("/notifications", protectRoute, getNotificationsList);
// userRoute.put("/profile", protectRoute, updateUserProfile);
// userRoute.put("/read-noti", protectRoute, markNotificationRead);

// userRoute
//   .route("/:id")
//   .put(protectRoute, isAdminRoute, activateUserProfile)
//   .delete(protectRoute, isAdminRoute, deleteUserProfile);

// export default userRoute