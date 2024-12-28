import axios from "axios";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_API_URL;
const role = localStorage.getItem("role");
const id = localStorage.getItem("CurrentUserId");
const token = localStorage.getItem("token");


export const logout = async () => {
 console.log("role....",role)
    if (!role || !id || !token) {
        Swal.fire({
            icon: "warning",
            title: "Missing Information",
            text: "Required logout information is missing. Please try again.",
            showConfirmButton: true,
        });
        return;
    }

    try {
        const resp = await axios.post(
            `${BASE_URL}/api/auth/logout/${id}?role=${role}`,
      {},
           
            
        );
 
        // Clear all localStorage data
        localStorage.clear();
       console.log("res    "+resp)

        // Display success alert
        Swal.fire({
            icon: "success",
            title: "Logged out successfully",
            text: "You have been logged out!",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
        });
    
    } catch (error) {
        // Display error alert
        Swal.fire({
            icon: "error",
            title: "Logout failed",
            text: error.response?.data?.message || "Something went wrong. Please try again.",
            showConfirmButton: true,
        });
    }
};
