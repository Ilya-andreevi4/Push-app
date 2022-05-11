export {}
// import { useForm, Controller } from "react-hook-form";
// import {
//   TextField,
//   Grid,
//   Container,
//   Button,
//   Typography,
// } from "@mui/material";
// import { yupResolver } from "@hookform/resolvers/yup";
// import validationSchema from "./validation";
// import api from "../../../services/api";
// import useAuth from "../../hooks/useAuth";
// import { Link } from "react-router-dom";
// import { useState } from "react";

// function Registration() {
//   const [isLoading, setIsLoading] = useState(false);
//   const auth = useAuth();

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm({
//     resolver: yupResolver(validationSchema),
//   });

//   const onSubmit = async (data) => {
//     try {
//       setIsLoading(true);
//       await api.auth.registration(data);
//       const { data: loginData } = await api.auth.login(data);
//       auth.setToken(loginData.token);
//       auth.setUser(loginData.user);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="xs" sx={{mt:"5rem"}}>
//       <Grid container spacing={3} >
//         <Grid item xs={12}>
//           <Typography variant="h6">Create new account</Typography>
//         </Grid>
//       </Grid>
//       <form onSubmit={handleSubmit(onSubmit)}>
          
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <Controller
//               name="firstName"
//               control={control}
//               defaultValue=""
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   error={Boolean(errors.firstName?.message)}
//                   fullWidth={true}
//                   label="First name"
//                   variant="filled"
//                   helperText={errors.firstName?.message}
//                 />
//               )}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Controller
//               name="lastName"
//               control={control}
//               defaultValue=""
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   error={Boolean(errors.lastName?.message)}
//                   fullWidth={true}
//                   label="Last name"
//                   variant="filled"
//                   helperText={errors.lastName?.message}
//                 />
//               )}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Controller
//               name="email"
//               control={control}
//               defaultValue=""
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   error={Boolean(errors.email?.message)}
//                   fullWidth={true}
//                   type="email"
//                   label="Email"
//                   variant="filled"
//                   helperText={errors.email?.message}
//                 />
//               )}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Controller
//               name="password"
//               control={control}
//               defaultValue=""
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   error={Boolean(errors.password?.message)}
//                   type="password"
//                   fullWidth={true}
//                   label="Password"
//                   variant="filled"
//                   helperText={errors.password?.message}
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button
//               variant="contained"
//               color="primary"
//               type="submit"
//               disabled={isLoading}
//             >
//                 Registration
//             </Button>
//             <Button
//               color="inherit"
//               type="submit"
//               component={Link}
//               to="/login"
//             >
//                 Already have an account?
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Container>
//   );
// }

// export default Registration;