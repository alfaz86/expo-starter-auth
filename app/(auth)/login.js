import React from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "@store/authSlice";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      await dispatch(login(values)).unwrap();
      router.push("/home");
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
        ...styles.container,
        marginBottom: Platform.OS === "android" ? -insets.bottom : 0,
      }}
    >
      <View style={styles.card}>
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
              <TextInput
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              {errors.email && touched.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <TextInput
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                secureTextEntry
                style={styles.input}
              />
              {errors.password && touched.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              <View style={{ gap: 10 }} >
                <Button
                  title={isSubmitting ? "Logging in..." : "Login"}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                />

                <Text
                  style={styles.link}
                  onPress={() => router.push("/register")}
                >
                  Register
                </Text>
              </View>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
  link: {
    color: "blue",
    marginTop: 10,
    textAlign: "center",
  },
});
