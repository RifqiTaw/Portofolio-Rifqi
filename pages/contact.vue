<script setup lang="ts">
import emailjs from "@emailjs/browser";
import Toaster from "@/components/ui/toast/Toaster.vue";
import { useToast } from "~/components/ui/toast";

useSeoMeta({
  title: "Contact — Rifqi Taufiqurrohman",
  description: "Get in touch with Rifqi Taufiqurrohman via email.",
});

const { toast } = useToast();
const config = useRuntimeConfig().public;

const form = ref({
  name: "",
  email: "",
  message: "",
});

const isSending = ref(false);

const isButtonDisabled = computed(() => {
  return (
    isSending.value ||
    !form.value.name.trim() ||
    !form.value.email.trim() ||
    !form.value.message.trim()
  );
});

const submitForm = async () => {
  if (isButtonDisabled.value) return;
  isSending.value = true;
  try {
    await emailjs.send(
      String(config.emailjsServiceId),
      String(config.emailjsTemplateId),
      {
        from_name: form.value.name,
        from_email: form.value.email,
        message: form.value.message,
      },
      { publicKey: String(config.emailjsPublicKey) }
    );

    form.value = { name: "", email: "", message: "" };

    toast({
      title: "Success",
      description: "Email sent successfully!",
      variant: "default",
      style: {
        backgroundColor: "#4caf50",
        color: "#fff",
      },
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    // Laporkan ke server supaya muncul di Vercel Runtime Logs (fire-and-forget)
    const { status, text } = (error ?? {}) as { status?: number; text?: string };
    $fetch("/api/contact-error", {
      method: "POST",
      body: { status, text: text ?? String(error) },
    }).catch(() => {});
    toast({
      title: "Error",
      description: "Failed to send email. Please try again.",
      variant: "default",
    });
  } finally {
    isSending.value = false;
  }
};
</script>

<template>
  <div class="relative py-16">
    <div class="relative z-10 mx-auto max-w-7xl px-6">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold tracking-tight text-white">Contact</h2>
        <p class="mt-2 text-lg text-white">Get in touch with me via email.</p>
      </div>

      <div class="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <p class="mb-6 text-lg">Send me an email</p>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Name</label
            >
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
            />
          </div>
          <div class="mb-4">
            <label for="message" class="block text-sm font-medium text-gray-700"
              >Message</label
            >
            <textarea
              id="message"
              v-model="form.message"
              rows="4"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
            >
            </textarea>
          </div>
          <button
            type="submit"
            :disabled="isButtonDisabled"
            class="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSending ? "Sending..." : "Send" }}
          </button>
        </form>
      </div>

      <Toaster />
    </div>
  </div>
</template>

<style scoped>
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.bg-cover {
  background-size: cover;
}

.bg-center {
  background-position: center;
}
</style>
