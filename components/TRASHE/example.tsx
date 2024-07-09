// "use client";
// import { signIn } from "next-auth/react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import { FaGithub, FaGoogle } from "react-icons/fa";

// export default function RegisterForm() {
//     const router = useRouter();
//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors },
//     } = useForm();
//     const [loading, setLoading] = useState(false);
//     const [emailErr, setEmailErr] = useState("");

    
//     // Register form
//     async function onSubmit(data) {
//         try {
//         console.log(data);
//         setLoading(true);
//         const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//         const response = await fetch(`${baseUrl}/api/user`, {
//             method: "POST",
//             headers: {
//             "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         });

//         const responseData = await response.json();

//         if (response.ok) {
//             setLoading(false);
//             toast.success("User Created Successfully");
//             reset();
//             router.push("/login");
//         } else {
//             setLoading(false);
//             if (response.status === 409) {
//             setEmailErr("User with this Email already exists");
//             toast.error("User with this Email already exists");
//             } else {
//             // Handle other errors
//             console.error("Server Error:", responseData.message);
//             toast.error("Oops Something Went wrong");
//             }
//         }
//         } catch (error) {
//         setLoading(false);
//         console.error("Network Error:", error);
//         toast.error("Something Went wrong, Please Try Again");
//         }
//     }
// }