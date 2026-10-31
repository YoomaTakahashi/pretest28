<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_eva === 2 || user.status_eva === 3">
                    <h1 class="font-weight-bold">ผลการประเมินของผู้รับการประเมินผล</h1>
                    <v-card elevation="5" rounded class="pa-4">
                        <p>ผู้ใช้งาน : {{ user.fname }} {{ user.lname }}</p>
                        <p>รอบการประเมินที่ : {{ user.round_sys }} ปี {{ user.year_sys }}</p>
                    </v-card>
                    <v-row v-for="(topic,t) in topics" :key="topic.id_topic">
                        <v-col cols="12">
                            <h1 class="font-weight bold">{{ t+1 }}.{{ topic.name_topic }}</h1>
                            <v-table class="table">
                                <tr>
                                    <th class="bg-grey border pa-2" style="width: 10%;">ตัวชี้วัด</th>
                                    <th class="bg-grey border pa-2" style="width: 10%;">รายละเอียดตัวชี้วัด</th>
                                    <th class="bg-grey border pa-2" style="width: 10%;">น้ำหนักคะแนน</th>
                                    <th class="bg-grey border pa-2" style="width: 10%;">คะแนนเต็ม</th>
                                    <th class="bg-grey border pa-2" style="width: 10%;">รายละเอียด</th>
                                    <th class="bg-grey border pa-2" style="width: 10%;">ไฟล์</th>
                                    <th class="bg-grey border pa-2" style="width: 10%;">คะแนนที่ได้</th>
                                </tr>
                                <tr v-for="(indicate,i) in topic.indicates" :key="indicate.id_indicate">
                                    <td class="border pa-2 text-center" style="width: 10%;">{{ indicate.name_indicate }}</td>
                                    <td class="border pa-2 text-center" style="width: 10%;">{{ indicate.detail_indicate }}</td>
                                    <td class="border pa-2 text-center" style="width: 10%;">{{ indicate.point_indicate }}</td>
                                    <td class="border pa-2 text-center" style="width: 10%;">{{ indicate.point_indicate*4 }}</td>
                                    <td class="border pa-2 text-center" style="width: 10%;">{{ indicate.detail_eva || '-' }}</td>
                                    <td class="border pa-2 text-center" style="width: 10%;"><v-btn color="info" prepend-icon="mdi-eye" @click="viwe(indicate.file_eva)">เปิดดู</v-btn></td>
                                    <td class="border pa-2 text-center" style="width: 10%;">{{ indicate.score_member*indicate.point_indicate }}</td>   
                                </tr>
                            </v-table>
                        </v-col>
                    </v-row>
                    <div class="mt-4 text-end">
                        <v-card color="success" class="rounded" >คะแนนรวม : {{ user.total_eva }} คะแนน</v-card>
                    </div>
                </v-form>
                <v-alert v-else-if="user.status_eva === 1" type="warning" variant="tonal" color="warning">ยังไม่ได้ประเมินตนเอง</v-alert>
                <v-alert v-else type="error" variant="tonal" color="error">ไม่มีแบบประเมิน</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { eva,api } from '~/API/base';

const user = ref<any>({})
const topics = ref<any>([])

const viwe = (file:string) =>{
    const url = new URL(`/uploads/file_eva/${file}`,api).href
    window.open(url,'_blank')
}

const fetch = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res =await axios.get(`${eva}/selfeva/user`,{headers:{Authorization:`Bearer ${token}`}})
        user.value = res.data
        console.log(res)
    } catch (error) {
        console.error('Error Get user',error)
    }
}
const fetchTopic = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res =await axios.get(`${eva}/score_member/Topic`,{headers:{Authorization:`Bearer ${token}`}})
        topics.value = res.data
    } catch (error) {
        console.error('Error Get topics',error)
    }
}

onMounted(async()=>{
    await Promise.all([fetch(),fetchTopic()])
})


</script>

<style scoped>
.rounded{
    border-radius: 24px !important;
}
</style>