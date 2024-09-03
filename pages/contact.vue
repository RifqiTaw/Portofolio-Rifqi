<template>
  <div class="bg-white py-16 pt-32">
    <div class="mx-auto max-w-7xl px-6">
      <!-- Section Title -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900">Contact</h2>
        <p class="mt-2 text-lg text-gray-600">
          Get in touch with me via social media or email.
        </p>
      </div>

      <!-- Social Media Icons -->
      <div class="flex justify-center gap-8 mb-12">
        <a href="https://www.linkedin.com/in/rifqi-taufiqurrohman98/">
          <Icon name="mdi:linkedin" style="color: black" size="30" />
        </a>
        <a href="https://www.instagram.com/rifqi_taw/">
          <Icon name="mdi:instagram" style="color: black" size="30" />
        </a>
      </div>

      <!-- Contact Form -->
      <div class="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <p class="mb-6 text-lg text-gray-900">Send me an email</p>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-4">
            <label
              for="message"
              class="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              v-model="form.message"
              rows="4"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import emailjs from "emailjs-com";
import Toaster from "@/components/ui/toast/Toaster.vue";
import { useToast } from "~/components/ui/toast";

const { toast } = useToast();

const form = ref({
  name: "",
  email: "",
  message: "",
});

const submitForm = async () => {
  try {
    const serviceID = "service_ogvilhp";
    const templateID = "template_3btjkre";
    const userID = "ssBQZeElx9wEa00NL";

    await emailjs.send(
      serviceID,
      templateID,
      {
        from_name: form.value.name,
        from_email: form.value.email,
        message: form.value.message,
      },
      userID
    );

    toast({
      title: "Success",
      description: "Email sent successfully!",
      variant: "success",
      style: {
        backgroundColor: "#4caf50",
        color: "#fff",
      },
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    toast({
      title: "Error",
      description: "Failed to send email. Please try again.",
      variant: "error",
    });
  }
};
</script>

<style scoped></style>
