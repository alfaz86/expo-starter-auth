import React from "react";
import { Dimensions, View } from "react-native";
import { useDispatch } from "react-redux";
// import { register } from "@/store/authSlice";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";

import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { Feather } from "@expo/vector-icons";
import { Link, LinkText } from "@/components/ui/link";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height } = Dimensions.get("window");

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleRegister = async (values, { setSubmitting, setErrors }) => {
    try {
      // await dispatch(register(values)).unwrap();
      alert("Registration successful");
      router.push("/login");
    } catch (err) {
      console.log(err);
      setErrors({ email: "Invalid email or password" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        marginBottom: insets.bottom ? -insets.bottom : 0,
        padding: 20,
        paddingTop: height * 0.25,
        backgroundColor: "#fff",
      }}
    >
      <Heading size="2xl" style={{ alignSelf: "center" }}>Register</Heading>

      <Formik
        initialValues={{
          name: "Admin",
          email: "admin@example.com",
          password: "password",
        }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <>
            {/* Name */}
            <FormControl isInvalid={touched.name && !!errors.name} className="mb-3">
              <FormControlLabel>
                <FormControlLabelText>Name</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  value={values.name}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  placeholder="Masukkan nama"
                />
              </Input>
              {touched.name && errors.name && (
                <FormControlError>
                  <Feather name="alert-circle" size={16} color="red" style={{ marginRight: 4 }} />
                  <FormControlErrorText className="text-red-500">
                    {errors.name}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            {/* Email */}
            <FormControl isInvalid={touched.email && !!errors.email} className="mb-3">
              <FormControlLabel>
                <FormControlLabelText>Email</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  placeholder="Masukkan email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </Input>
              {touched.email && errors.email && (
                <FormControlError>
                  <Feather name="alert-circle" size={16} color="red" style={{ marginRight: 4 }} />
                  <FormControlErrorText className="text-red-500">
                    {errors.email}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            {/* Password */}
            <FormControl isInvalid={touched.password && !!errors.password} className="mb-3">
              <FormControlLabel>
                <FormControlLabelText>Password</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  placeholder="Masukkan password"
                  secureTextEntry
                />
              </Input>
              {touched.password && errors.password && (
                <FormControlError>
                  <Feather name="alert-circle" size={16} color="red" style={{ marginRight: 4 }} />
                  <FormControlErrorText className="text-red-500">
                    {errors.password}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            {/* Button */}
            <Button className="mt-3" onPress={handleSubmit} isDisabled={isSubmitting}>
              <ButtonText>
                {isSubmitting ? "Registering..." : "Register"}
              </ButtonText>
            </Button>

            {/* Link Login */}
            <View style={{ marginTop: 20, alignItems: 'center' }}>
              <Text>Already have an account?</Text>
              <Link onPress={() => router.back()}>
                <LinkText>Login</LinkText>
              </Link>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}
