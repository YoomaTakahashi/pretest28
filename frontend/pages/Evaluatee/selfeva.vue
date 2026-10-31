<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_eva === 1" @submit.prevent="saveScore">
                    <h1 class="font-weight-bold">แบบประเมินตนเอง</h1>
                    <v-card elevation="5" rounded class="pa-4">
                        <p>ผู้ใช้งาน : {{ user.fname }} {{ user.lname }}</p>
                        <p>รอบการประเมินที่ : {{ user.round_sys }} ปี {{ user.year_sys }}</p>
                    </v-card>
                    <v-row v-for="(topic,t) in topics" :key="topic.id_topic">
                        <v-col cols="12">
                            <h1 class="font-weight bold">{{ t+1 }}.{{ topic.name_topic }}</h1>
                            <v-card elevation="5" rounded class="pa-5">
                                <v-row v-for="(indicate,i) in topic.indicates" :key="indicate.id_indicate">
                                    <v-col cols="12">
                                        {{ t+1 }}.{{ i+1 }}.{{ indicate.name_indicate }} รายละเอียดตัวชี้วัด :{{ indicate.detail_indicate }} น้ำหนักคะแนน : {{ indicate.point_indicate }} คะแนนเต็ม : {{ indicate.point_indicate*4 }}
                                        <v-textarea label="คำอธิบายเพิ่มเติม(ถ้ามี)" rows="2" variant="solo-filled" v-model="indicate.detail_eva" ></v-textarea>
                                        <v-file-input label="*** รองรับเฉพาะนามสกุลไฟล์ .png .pdf .jpg *** " v-model="indicate.file_eva" variant="solo-filled" ></v-file-input>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>