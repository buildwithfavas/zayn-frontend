import * as Yup from "yup";

export const signUpValidationSchema = Yup.object({
  firstName: Yup.string()
    .required("First Name is required")
    .min(3, "please enter minimum 3 characters")
    .matches(/^[A-Za-z ]+$/, "Name can only contain letters and spaces")
    .test("not-only-spaces", "Name cannot be empty spaces", (value) => {
      return value && value.trim().length > 0;
    }),
  lastName: Yup.string()
    .required("Last Name is required")
    .min(3, "please enter minimum 3 characters")
    .matches(/^[A-Za-z ]+$/, "Name can only contain letters and spaces")
    .test("not-only-spaces", "Name cannot be empty spaces", (value) => {
      return value && value.trim().length > 0;
    }),
  gender: Yup.string().required("Gender is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character")
    .test("not-only-spaces", "Password cannot be empty spaces", (value) => {
      return value && value.trim().length > 0;
    }),
  // confirmPassword: Yup 
  // .string()
  // .oneOf([Yup.ref("password"), null], "Password must match")
  // .required("must enter confirm password"),
  // referralCode: Yup 
  // .string()
  // .trim()
  // .optional()
  // .matches(
  //   /^[A-Za-z0-9]*$/,
  //   "Referral code can only contain letters and numbers"
  // ),
  agreeTerms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

export const productValidationSchema = Yup.object().shape({
  name: Yup 
    .string()
    .required("Product name is required")
    .min(6, "please enter minimum 6 characters")
    .test("not-only-spaces", "Name cannot be empty spaces", (value) => {
      return value && value.trim().length > 0;
    }),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  subCategory: Yup.string().required("Sub Category is required"),
  thirdCategory: Yup.string().required("Third Level Category is required"),
  brand: Yup.string().required("Brand is required"),
  isFeatured: Yup.string(),
  variants: Yup.array().of(
    Yup.object().shape({
      size: Yup.string(),
      price: Yup 
        .number()
        .transform((value, originalValue) =>
          String(originalValue).trim() === "" ? null : value
        )
        .typeError("Price must be a number")
        .required("Price is required")
        .positive("Price must be positive"),
      oldPrice: Yup 
        .number()
        .nullable()
        .transform((value, originalValue) =>
          String(originalValue).trim() === "" ? null : value
        )
        .required("Price is required")
        .test(
          "oldPrice-greater",
          "Old price must be greater than price",
          function (value) {
            const { price } = this.parent;
            if (value == null || price == null) return true;
            return value > price;
          }
        ),
      stock: Yup 
        .number()
        .transform((value, originalValue) =>
          String(originalValue).trim() === "" ? null : value
        )
        .typeError("Stock must be a number")
        .required("Stock is required")
        .integer("Stock must be an integer")
        .min(0, "Stock cannot be negative"),
      images: Yup 
        .mixed()
        .test("required", "At least 1 image is required", function (value) {
          return value && value.length > 0;
        }),
    })
  ),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup 
    .string()
    .required("email is required")
    .email("invalid email format"),
  password: Yup 
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .test("not-only-spaces", "Password cannot be empty spaces", (value) => {
      return value && value.trim().length > 0;
    }),
});

export const forgotPassEmailSchema = Yup.object().shape({
  email: Yup 
    .string()
    .required("email is required")
    .email("invalid email format"),
});

export const forgotPassResetSchema = Yup.object().shape({
  newPassword: Yup 
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .test("not-only-spaces", "Password cannot be empty spaces", (value) => {
      return value && value.trim().length > 0;
    }),
  confirmPassword: Yup 
    .string()
    .oneOf([Yup.ref("newPassword"), null], "Password must match")
    .min(6, "Password must be at least 6 characters")
    .required("must enter confirm password"),
});

export const PasswordResetSchema = Yup.object().shape({
  currentPassword: Yup 
    .string()
    .required("Current Password is required")
    .min(6, "Password must be at least 6 characters")
    .test("not-only-spaces", "Password cannot be empty spaces", (value) => {
      return value && value.trim().length > 0;
    }),
  newPassword: Yup 
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .test("not-only-spaces", "Password cannot be empty spaces", (value) => {
      return value && value.trim().length > 0;
    }),
  confirmPassword: Yup 
    .string()
    .oneOf([Yup.ref("newPassword"), null], "Password must match")
    .min(6, "Password must be at least 6 characters")
    .required("must enter confirm password"),
});

export const subCatSchema = Yup.object().shape({
  name: Yup 
    .string()
    .required("Category name is required")
    .test("not-only-spaces", "Name cannot be empty spaces", (value) => {
      return value && value.trim().length > 0;
    }),
  parent: Yup.string().required("This Field is required"),
});

export const catSchema = Yup.object().shape({
  name: Yup 
    .string()
    .required("Category name is required")
    .test("not-only-spaces", "Name cannot be empty spaces", (value) => {
      return value && value.trim().length > 0;
    }),
  image: Yup.mixed().required("Image is required"),
});

export const editCatSchema = Yup.object().shape({
  name: Yup 
    .string()
    .required("Category name is required")
    .test("not-only-spaces", "Name cannot be empty spaces", (value) => {
      return value && value.trim().length > 0;
    }),
});

export const addVariantSchema = Yup.object().shape({
  size: Yup.string(),
  price: Yup 
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be positive"),
  oldPrice: Yup 
    .number()
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .test(
      "oldPrice-greater",
      "Old price must be greater than price",
      function (value) {
        const { price } = this.parent;
        if (value == null || price == null) return true;
        return value > price;
      }
    ),
  stock: Yup 
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .typeError("Stock must be a number")
    .required("Stock is required")
    .integer("Stock must be an integer")
    .min(0, "Stock cannot be negative"),
});

export const editVariantSchema = Yup.object().shape({
  size: Yup.string(),
  price: Yup 
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be positive"),
  oldPrice: Yup 
    .number()
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .test(
      "oldPrice-greater",
      "Old price must be greater than price",
      function (value) {
        const { price } = this.parent;
        if (value == null || price == null) return true;
        return value > price;
      }
    ),
  stock: Yup 
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .typeError("Stock must be a number")
    .required("Stock is required")
    .integer("Stock must be an integer")
    .min(0, "Stock cannot be negative"),
});

export const userProfileSchema = Yup.object().shape({
  name: Yup 
    .string()
    .required("Full Name is required")
    .min(6, "please enter minimum 6 characters")
    .test("not-only-spaces", "Name cannot be empty spaces", (value) => {
      return value && value.trim().length > 0;
    }),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup 
    .string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian phone number")
    .required("Phone number is required"),
});

export const editProductSchema = Yup.object().shape({
  name: Yup 
    .string()
    .required("Product name is required")
    .min(6, "please enter minimum 6 characters")
    .test("not-only-spaces", "Name cannot be empty spaces", (value) => {
      return value && value.trim().length > 0;
    }),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  subCategory: Yup.string().required("Sub Category is required"),
  thirdCategory: Yup.string().required("Third Level Category is required"),
  brand: Yup.string().required("Brand is required"),
  isFeatured: Yup.string(),
});

export const addressSchema = Yup.object().shape({
  name: Yup 
    .string()
    .trim()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),

  mobile: Yup 
    .string()
    .matches(/^[0-9]{10}$/, "Mobile must be exactly 10 digits")
    .required("Mobile number is required"),

  pin_code: Yup 
    .string()
    .matches(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit Pincode")
    .required("Pincode is required"),

  locality: Yup.string().trim().required("Locality is required"),

  address_line: Yup 
    .string()
    .trim()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),

  city: Yup.string().trim().required("City is required"),

  state: Yup 
    .string()
    .oneOf(
      [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
      ],
      "Select a valid state"
    )
    .required("State is required"),

  landmark: Yup.string().trim().nullable(),

  alternative_mobile: Yup 
    .string()
    .nullable()
    .matches(/^$|^[0-9]{10}$/, "Alternate mobile must be 10 digits"),

  type: Yup 
    .string()
    .oneOf(["Home", "Office"], "Invalid type")
    .required("Address type is required"),
});

export const reasonSchema = Yup.object().shape({
  reason: Yup 
    .string()
    .required("Reason is required")
    .min(20, "please enter minimum 20 characters")
    .test("not-only-spaces", "Name cannot be empty spaces", (value) => {
      return value && value.trim().length > 0;
    }),
});

export const reviewSchema = Yup.object().shape({
  review: Yup 
    .string()
    .required("Review is required")
    .min(5, "please enter minimum 5 characters")
    .test("not-only-spaces", "Name cannot be empty spaces", (value) => {
      return value && value.trim().length > 0;
    }),
});

export const offerSchema = Yup.object().shape({
  discountValue: Yup 
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .typeError("Offer value must be a number")
    .required("Offer value is required")
    .max(100, "Offer value cannot exceed 100%"),
});

export const globalOfferSchema = Yup.object().shape({
  title: Yup 
    .string()
    .required("Title is required")
    .min(7, "please enter minimum 7 characters")
    .test("not-only-spaces", "Name cannot be empty spaces", (value) => {
      return value && value.trim().length > 0;
    }),
  discountValue: Yup 
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .typeError("Offer value must be a number")
    .required("Offer value is required")
    .min(1, "Offer value must be at least 1%")
    .max(100, "Offer value cannot exceed 100%"),
  startDate: Yup 
    .date()
    .typeError("Start date is required")
    .required("Start date is required"),

  expiryDate: Yup 
    .date()
    .typeError("Expiry date is required")
    .required("Expiry date is required")
    .min(Yup.ref("startDate"), "Expiry date must be after start date"),
});

export const couponSchema = Yup.object().shape({
  code: Yup 
    .string()
    .trim()
    .required("Coupon code is required")
    .matches(
      /^[A-Za-z0-9_-]+$/,
      "Code can only contain letters, numbers, - and _"
    )
    .max(8, "Code must be 8 characters or less"),

  discountType: Yup 
    .string()
    .required("Discount type is required")
    .oneOf(["Percentage", "Flat"], "Invalid discount type"),

  description: Yup 
    .string()
    .trim()
    .required("Description is required")
    .max(70, "Description can be up to 70 characters"),

  discountValue: Yup 
    .number()
    .typeError("Discount value must be a number")
    .positive("Discount must be greater than 0")
    .when("type", {
      is: "Percentage",
      then: (schema) =>
        schema.max(100, "Percentage discount cannot exceed 100%"),
      otherwise: (schema) => schema.max(100000, "Flat discount seems too high"),
    })
    .required("Discount value is required"),

  minPurchaseAmount: Yup 
    .number()
    .typeError("Minimum purchase must be a number")
    .positive("Minimum purchase must be greater than 0")
    .required("Minimum purchase value is required"),

  scope: Yup 
    .string()
    .required("Scope is required")
    .oneOf(["User", "First Order", "Global"], "Invalid scope"),

  usageLimit: Yup 
    .number()
    .typeError("Usage limit must be a number")
    .integer("Usage limit must be an integer")
    .positive("Usage limit must be greater than 0")
    .required("Usage limit is required"),

  startDate: Yup 
    .date()
    .typeError("Start date is required")
    .required("Start date is required"),

  expiryDate: Yup 
    .date()
    .typeError("Expiry date is required")
    .required("Expiry date is required")
    .min(Yup.ref("startDate"), "Expiry date must be after start date"),
});

export const addMoneySchema = Yup.object().shape({
  amount: Yup 
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be positive")
    .min(100, "Minimum amount is ₹100")
    .max(50000, "Maximum amount is ₹50,000")
    .required("Amount is required"),
});

export const homeSlidesSchema = Yup.object().shape({
  description: Yup 
    .string()
    .required("Description is required")
    .min(5, "Description should be at least 5 characters"),
  link: Yup.string().required("Link is required"),
});

