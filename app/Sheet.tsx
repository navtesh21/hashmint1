import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useForm, useFieldArray, Controller ,useWatch} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  sender: z.object({
    name: z.string().min(1, { message: "Sender name is required" }),
    email: z.string().email({ message: "Invalid email" }),
    street: z.string().min(1, { message: "Street is required" }),
    city: z.string().min(1, { message: "City is required" }),
    postcode: z.string().min(1, { message: "Postcode is required" }),
    country: z.string().min(1, { message: "Country is required" }),
  }),
  client: z.object({
    name: z.string().min(1, { message: "Client name is required" }),
    email: z.string().email({ message: "Invalid email" }),
    street: z.string().min(1, { message: "Street is required" }),
    city: z.string().min(1, { message: "City is required" }),
    postcode: z.string().min(1, { message: "Postcode is required" }),
    country: z.string().min(1, { message: "Country is required" }),
  }),
  items: z
    .array(
      z.object({
        description: z
          .string()
          .min(1, { message: "Item description is required" }),
        amount: z
          .string()
          .min(1, { message: "Amount is required" })
          .regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid amount" }),
      })
    )
    .min(1, { message: "At least one item is required" }),
  status: z.enum(["draft", "pending", "paid"]),
});

const Sheet = () => {
  const [total, setTotal] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      sender: {
        name: "",
        email: "",
        street: "",
        city: "",
        postcode: "",
        country: "",
      },
      client: {
        name: "",
        email: "",
        street: "",
        city: "",
        postcode: "",
        country: "",
      },
      items: [{ description: "", amount: "" }],
      status: "draft",
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "items",
  });
  const items = useWatch({
    control,
    name: "items",
  });

  useEffect(() => {
    const calculateTotal = () => {
      const sum = items.reduce((acc, item) => {
        return acc + (parseFloat(item.amount) || 0);
      }, 0);
      setTotal(sum.toFixed(2));
    };

    calculateTotal();
  }, [items]);

  const onSubmit = (data) => {
    console.log(data);
    // Here you would typically send the data to your backend or process it further
  };

  const addItem = () => {
    append({ description: "", amount: "" });
  };

  return (
    <ScrollView className={"w-full h-full bg-[#FFF975] p-4"}>
      <View className={"p-4"}>
        <Text className={"text-2xl font-bold mb-4"}>Invoice Generator</Text>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={"border border-gray-300 rounded-md p-2 mb-1"}
              placeholder="Invoice Title"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="title"
        />
        {errors.title && (
          <Text className={"text-red-500 mb-2"}>{errors.title.message}</Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={"border border-gray-300 rounded-md p-2 mb-1 h-24"}
              placeholder="Description"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
            />
          )}
          name="description"
        />
        {errors.description && (
          <Text className={"text-red-500 mb-2"}>
            {errors.description.message}
          </Text>
        )}

        <View className={"mb-4"}>
          <Text className={"text-xl font-semibold mb-2"}>Sender Details</Text>
          {["name", "email", "street", "city", "postcode", "country"].map(
            (field) => (
              <View key={field}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className={"border border-gray-300 rounded-md p-2 mb-1"}
                      placeholder={
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name={`sender.${field}`}
                />
                {errors.sender && errors.sender[field] && (
                  <Text className={"text-red-500 mb-1"}>
                    {errors.sender[field].message}
                  </Text>
                )}
              </View>
            )
          )}
        </View>

        <View className={"mb-4"}>
          <Text className={"text-xl font-semibold mb-2"}>Client Details</Text>
          {["name", "email", "street", "city", "postcode", "country"].map(
            (field) => (
              <View key={field}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className={"border border-gray-300 rounded-md p-2 mb-1"}
                      placeholder={
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name={`client.${field}`}
                />
                {errors.client && errors.client[field] && (
                  <Text className={"text-red-500 mb-1"}>
                    {errors.client[field].message}
                  </Text>
                )}
              </View>
            )
          )}
        </View>

        <Text className={"text-xl font-semibold mb-2"}>Items</Text>
        {fields.map((field, index) => (
          <View key={field.id} className={"flex-row mb-2"}>
            <View className={"flex-grow mr-2"}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className={"border border-gray-300 rounded-md p-2"}
                    placeholder="Description"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name={`items.${index}.description`}
              />
              {errors.items && errors.items[index]?.description && (
                <Text className={"text-red-500"}>
                  {errors.items[index].description.message}
                </Text>
              )}
            </View>
            <View className={"w-24"}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className={"border border-gray-300 rounded-md p-2"}
                    placeholder="Amount"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="numeric"
                  />
                )}
                name={`items.${index}.amount`}
              />
              {errors.items && errors.items[index]?.amount && (
                <Text className={"text-red-500"}>
                  {errors.items[index].amount.message}
                </Text>
              )}
            </View>
          </View>
        ))}
        <TouchableOpacity
          className={"bg-blue-500 p-2 rounded-md items-center mb-4"}
          onPress={addItem}
        >
          <Text className={"text-white font-bold"}>+ Add Item</Text>
        </TouchableOpacity>

        <View className={"mb-4"}>
          <Text className={"text-xl font-semibold mb-2"}>Invoice Status</Text>
          <View className={"border border-gray-300 rounded-md"}>
            {/* <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
            //     <Picker
            //       selectedValue={value}
            //       onValueChange={onChange}
            //       className={('h-12')}
            //     >
            //       <Picker.Item label="Draft" value="draft" />
            //       <Picker.Item label="Pending" value="pending" />
            //       <Picker.Item label="Paid" value="paid" />
            //     </Picker>
            //   )}
            //   name="status"
            // /> */}
          </View>
          <Text>Total:{total}</Text>
        </View>

        <TouchableOpacity
          className={"bg-green-500 p-2 rounded-md items-center mt-4"}
          onPress={handleSubmit(onSubmit)}
        >
          <Text className={"text-white font-bold"}>Create Invoice</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Sheet;
