<template>
    <div>
<p>ACCUEIL</p>
<Button>TEST</Button>
<Alert variant="destructive">
    <RocketIcon class="w-4 h-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      Your session has expired. Please log in again.
    </AlertDescription>
  </Alert>
    </div>
</template>

<script setup lang="ts">
// import Button from '~/components/ui/button/Button.vue';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
// import { AlertCircle } from 'lucide-vue-next'
import { RocketIcon } from '@radix-icons/vue';
</script>


