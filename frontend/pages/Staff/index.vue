<template>
    <v-container>
        <v-card>
           <v-sheet elevation="5" rounded class="pa-4" >
            <h1 class="font-weight-bold text-center">DashBoard - Staff</h1>
            <v-card-text >
                <v-row>
                    <v-col cols="12" md="4" v-for="b in box" :key="b">
                        <v-card elevation="5" rounded="5" class="rounded py-2">
                            <div class="pa-1 text-center text-h5">{{ b.title }}</div>
                            <div class="pa-1 text-center text-h5">{{ b.value }}</div>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="4" v-for="b in box2" :key="b">
                        <v-card elevation="5" rounded="5" class="rounded py-2">
                            <div class="pa-1 text-center text-h5">{{ b.title }}</div>
                            <div class="pa-1 text-center text-h5">{{ b.value }}</div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
           </v-sheet> 
        </v-card>

        <v-card elevation="5" rounded class="mt-4">
           <v-sheet elevation="5" rounded class="pa-4" >
            <h1 class="font-weight-bold text-center">ผู้รับการประเมินผลทั้งหมด</h1>
            <v-table class="table">
                <tr>
                    <th class="bg-grey border pa-2" style="width: 10%;">ลำดับ</th>
                    <th class="bg-grey border pa-2" style="width: 10%;">ขื่อ-นามสุกล</th>
                    <th class="bg-grey border pa-2" style="width: 10%;">รอบการประเมิน</th>
                    <th class="bg-grey border pa-2" style="width: 10%;">ปีการประเมิน</th>
                    <th class="bg-grey border pa-2" style="width: 10%;">วันที่ออกแบบประเมิน</th>
                    <th class="bg-grey border pa-2" style="width: 10%;">สถานะการประเมิน</th>
                </tr>
                <tr v-for="(item,index) in result" :key="item.id_eva">
                    <td class="border pa-2 text-center" style="width: 10%;">{{ index+1 }}</td>
                    <td class="border pa-2 text-center" style="width: 10%;">{{ item.fname }}-{{ item.lname }}</td>
                    <td class="border pa-2 text-center" style="width: 10%;">{{ item.round_sys }}</td>
                    <td class="border pa-2 text-center" style="width: 10%;">{{ item.year_sys }}</td>
                    <td class="border pa-2 text-center" style="width: 10%;">{{ formatDate(item.day_eva) }}</td>
                    <td class="border pa-2 text-center" style="width: 10%;"><v-btn class="text-center text-white" :color="bg(item.status_eva)">{{ item.status_eva === 1 ? 'รอการประเมินตนเอง' : item.status_eva === 2 ? 'รอกรรมการประเมิน':'ประเมินสำเร็จ' }}</v-btn></td>
                </tr>
            </v-table>
           </v-sheet> 
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { api,eva, staff } from '~/API/base';
import axios from 'axios';

const box = ref([])
const box2 = ref([])
const result = ref<any>([])

const fecth = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${api}/dash/staff`,{headers:{Authorization:`Bearer ${token}`}})
        box.value = res.data.box
        box2.value = res.data.box2
        console.log(res)
    } catch (error) {
        console.error('Error get profile',error)
    }
}
const fecthR = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${staff}/eva/show`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data
        console.log(res)
    } catch (error) {
        console.error('Error get profile',error)
    }
}

const formatDate=(dateStr:string)=>{

    if(!dateStr)return '-'
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2,'0')
    const month = String(date.getMonth()+1).padStart(2,'0')
    const year = String(date.getFullYear())

    return `${day}/${month}/${year}`

}

const bg = (status_eva)=>{

    if(status_eva === 1)return 'error'
    if(status_eva === 2)return 'warning'
    if(status_eva === 3)return 'success'

}

onMounted(async()=>{
    await Promise.all([fecth(),fecthR()])
})
</script>

<style scoped>
.rounded{
    border-radius: 24px !important;
}
</style>