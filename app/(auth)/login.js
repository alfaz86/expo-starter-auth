import React from "react";
import { Dimensions, View } from "react-native";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";
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
import { colors } from "@/theme/colors";
import { useActiveTheme } from "@/hooks/useActiveTheme";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";

export default function Login() {
  const dispatch = useDispatch();
  const { safePush } = useSafeNavigation();
  const insets = useSafeAreaInsets();
  const { height } = Dimensions.get("window");
  const activeTheme = useActiveTheme();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      await dispatch(login(values)).unwrap();
      safePush("/home");
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
        padding: 10,
        paddingTop: height * 0.3,
        backgroundColor: activeTheme === 'dark'
          ? colors.darkContent.backgroundColor
          : colors.lightContent.backgroundColor,
      }}
    >
      <View style={{
        padding: 20,
        backgroundColor: activeTheme === 'dark'
          ? colors.dark.backgroundColor
          : colors.light.backgroundColor,
      }}>
        <Heading size="2xl" style={{ alignSelf: "center", marginBottom: 20 }}>Login</Heading>
        <Formik
          initialValues={{ email: "admin@example.com", password: "password" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
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
              <FormControl
                isInvalid={touched.password && !!errors.password}
                className="mb-3"
              >
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
              <Button
                className="mt-3"
                onPress={handleSubmit}
                isDisabled={isSubmitting}
              >
                <ButtonText>
                  {isSubmitting ? "Logging in..." : "Login"}
                </ButtonText>
              </Button>

              {/* Link Register */}
              <View style={{ marginTop: 20, alignItems: 'center' }}>
                <Text>Don't have an account?</Text>
                <Link onPress={() => safePush("/register")}>
                  <LinkText>Register</LinkText>
                </Link>
              </View>
            </>
          )}
        </Formik>
      </View>
    </View >
  );
}
