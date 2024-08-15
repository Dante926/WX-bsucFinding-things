<template>
    <div class="body">
        <h2>寻物管理</h2>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="openid" label="OpenID">
            </el-table-column>
            <el-table-column prop="classify1" label="一级分类">
            </el-table-column>
            <el-table-column prop="classify2" label="二级分类">
            </el-table-column>
            <el-table-column prop="name" label="名字">
            </el-table-column>
            <el-table-column prop="date" label="丢失时间">
            </el-table-column>
            <el-table-column prop="region" label="丢失地点">
            </el-table-column>
            <el-table-column prop="call" label="联系方式">
            </el-table-column>
            <el-table-column prop="desc" label="描述">
            </el-table-column>
            <el-table-column prop="status" label="认领状态">
                <template slot-scope="scope">
                    <p>{{ scope.row.status == 0 ? '未认领' : (scope.row.status == 1 ? '待认领' : '已认领') }}</p>
                    <el-button v-if="scope.row.status == 1" @click="$event => showClaimModal(scope)">审核</el-button>
                </template>
            </el-table-column>
            <el-table-column label="相关图片" width="120">
                <template slot-scope="scope">
                    <el-image style="width: 100px; height: 100px" :src="scope.row.imgList[0]"
                        :preview-src-list="scope.row.imgList">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column prop="time" label="发布时间">
            </el-table-column>
            <el-table-column prop="edit" label="操作">
                <template slot-scope="scope">
                    <el-popconfirm title="重要数据，确认删除?" @confirm="deleteData(scope.row._id)">
                        <el-button type="danger" slot="reference">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
            :page-sizes="[5, 10, 15, 20]" :page-size="size" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>

        <el-dialog @close="handleClose" title="认领审核" :visible.sync="dialogVisible" width="30%">
            <div class="dialog-claim-container">
                <!-- 描述信息 -->
                <p class="dialogtext">描述信息:</p>
                <p class="desc">{{ claimData.desc }}</p>
                <!-- 物品图片 -->
                <p class="dialogtext">物品图片:</p>
                <img class="img" :src="claimData.img_url" alt="">
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="$event => toClaim(1)">等待审核</el-button>
                <el-button type="primary" @click="$event => toClaim(2)">认领成功</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { formatTime } from '../components/index'
export default {
    data() {
        return {
            tableData: [],
            page: 1,
            size: 5,
            total: 0,
            dialogVisible: false,
            claimData: {},
            _id: '',
        }
    },
    created() {
        this.getTabData();
    },
    methods: {// 认领状态
        async toClaim(status) {

            const params = {
                _id: this._id,
                status
            }
            const { data } = await this.$http.post('/pubapi/toconfirm', params)
            if (data.message === 'Success') {
                this.$message({
                    message: '操作完成',
                    type: 'success'
                });
                this.dialogVisible = false;
                this.claimData = ''
                this._id = ''
                this.getTabData();
            } else {
                this.$message({
                    message: '操作失败,请重试',
                    type: 'error'
                });
            }

        },

        // 关闭弹窗回调
        handleClose() {

        },

        // 审核弹窗
        showClaimModal(scope) {
            this.dialogVisible = true
            const { _id } = scope.row
            this.claimInfo = JSON.parse(scope.row.claimInfo)
            // 給显示的数据赋值
            const { desc, img_url } = this.claimInfo[0]
            const claimData = {
                desc, img_url
            }
            this._id = _id
            this.claimData = claimData
        },
        async getTabData() {
            const params = {
                type: 1,
                page: this.page,
                size: this.size
            }
            const result = await this.$http.post('/adminapi/getdata', params)
            // console.log(result.data);
            const { data, total } = result.data
            // 将data里的字符串数组转换成真正的数组
            const modifiedData = data.map(item => ({
                ...item,
                imgList: item.imgList.replace(/^\["(.*)"\]$/, '$1').split('","').map(url => url.trim()) // 使用正则表达式去除外部的引号
            }));
            this.tableData = modifiedData.map(item => {
                return {
                    ...item,
                    time: formatTime(item.time)
                }
            })
            this.total = total
        },
        async deleteData(_id) {
            const params = { _id };
            console.log(params);
            if (_id) {
                const result = await this.$http.post('/adminapi/deledata', params)
                console.log(result);
                if (result.data.message == 'Success') {
                    // 提示删除成功
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getTabData();
                } else {
                    this.$message({
                        message: '删除失败',
                        type: 'error'
                    });
                    this.getTabData();
                }
            } else {
                // 提示数据出错
                this.$message.error('数据出错')
                this.getTabData();
            }

        },
        handleSizeChange(val) {
            this.size = val;
            this.getTabData();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getTabData();
        },
        // 时间戳转换为日期格式
        formatTime(time) {
            return formatDate(time, 'yyyy-MM-dd hh:mm:ss')
        }
    },
}
</script>

<style lang="less" scoped>
.body {
    padding: 20px;
    background-color: #fff;
    border-radius: 20px;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;

    h2 {
        margin-bottom: 20px;
    }
}

.dialog-claim-container {
    display: flex;
    flex-direction: column;

    .img {
        widows: 100%;
    }
}

.dialogtext {
    font-size: 16px;
    font-weight: 600;
    margin: 10px 0;
}

.desc {
    padding-right: 20px;
}
</style>