import storage from "./storage"
let data=[]
let route=[
    {
        path: '/home',
        name: '系统管理',
        // iconCls:require("../src/assets/xitong.png"), //图标样式class
        roles:['sys','managerOperation','operation'],
        children: [
            {
                path: '/home/patientManage',
                name: '患者管理',
                roles:['sys','managerOperation']
            },
            {
                path: '/home/userManage',
                name: 'APP用户管理',
                roles:['sys','managerOperation']
            },
            {
                path: '/home/regionManage',
                name: '地区管理',
                roles:['sys']
            },

            {
                path: '/home/role',
                name: '角色管理',
                roles:['sys']
            },
            {
                path: '/home/journal',
                name: '操作日志查询',
                roles:['sys']
            },
        ]
    },
    {
        path: '/home',
        name: '医药管理',
        // iconCls:require('../src/assets/yiyao.png'),
        // iconCls:require('../assets/yiyao.png'),
        roles:['sys','manageDoctor','doctor','managerOperation','operation','drugs'],
        children: [{
            path: '/home/drug',
            name: '药品管理',
            roles:['sys','operation','managerOperation','drugs']
         },
            {
                path: '/drugRecord',
                name: '药品分类',
                roles:['sys','drugs']
            },
            {
                path: '/hospital',
                name: '医院管理',
                roles:['sys']
            },
            {
                path: '/hospitalDept',
                name: '科室管理',
                roles:['sys','managerOperation','operation']
            },
            {
                path: '/doctor',
                name: '医生信息管理',
                roles:['sys','manageDoctor','doctor','managerOperation','operation']
            },
            {
                path: '/academic',
                name: '职称管理',
                roles:['sys']
            },
            {
                path: '/home/clinic',
                name: '诊所管理',
                roles:['sys']
            }
        ]
    },
    {
        path: '/',
        name: '用药助手管理',
        // iconCls:require('../src/assets/yongyao.png'),
        // iconCls: '../assets/yongyao.png',
        roles:['media','sys'],
        children: [{
            path: '/pharmacology',
            name: '药理分类',
            roles:['sys','media']
        },
            {
                path: '/medicineManage',
                name: '药品说明',
                roles:['sys','media']
            },

        ]
    },
    // {
    //     path: '/',
    //     name: '资讯管理',
    //     iconCls:require('../src/assets/zixun.png'),
    //     // iconCls: '../assets/zixun.png',
    //     roles:['sys','media'],
    //     leaf: true,//只有一个节点
    //     children: [
    //         {
    //         path: '/newsCategory',
    //         name: '资讯分类管理',
    //         roles:['sys','media']
    //        },
    //         {
    //             path: '/news',
    //
    //             name: '资讯信息管理',
    //             roles:['sys','media']
    //         },
    //         {
    //             path: '/addNews',
    //
    //             name: '资讯发布管理',
    //             roles:['sys','media']
    //         },
    //         {
    //             path: '/addNewsVideo',
    //             name: '资讯视频发布',
    //             roles:['sys','media']
    //         }
    //         ,
    //         {
    //             path: '/editNews',
    //             name: '资讯编辑',
    //             // hidden: true,
    //             roles:['sys','media']
    //         }
    //     ]
    // },
    // {
    //     path: '/',
    //     name: '订单管理',
    //     iconCls:require('../src/assets/order.png'),
    //     // iconCls: '../assets/order.png',
    //     roles:['sys','operation','managerOperation','order'],
    //     children: [
    //         {
    //             path: '/order',
    //             name: '订单管理',
    //             roles:['sys','operation','managerOperation','order']
    //         }
    //     ]
    // },
    // {
    //     path: '/',
    //     name: '广告管理',
    //     iconCls:require('../src/assets/ad.png'),
    //     // iconCls: '../assets/ad.png',
    //     roles:['sys','media'],
    //     children: [{
    //         path: '/ad',
    //
    //         name: '广告管理',
    //         roles:['sys','media']
    //     }]
    // },
    // {
    //     path: '/',
    //     name: '活动管理',
    //     iconCls:require('../src/assets/active.png'),
    //     // iconCls: '../assets/active.png',
    //     roles:['sys','media'],
    //     children: [{
    //         path: '/activity',
    //         name: '活动管理',
    //         roles:['sys','media']
    //     }]
    // },
    // {
    //     path: '/',
    //     name: '病例管理',
    //     iconCls:require('../src/assets/bingli.png'),
    //     // iconCls: '../assets/bingli.png',
    //     roles:['sys','media'],
    //     children: [{
    //         path: '/caseInfo',
    //         name: '病例管理',
    //         roles:['sys','media']
    //     }]
    // },
    // {
    //     path: '/',
    //     name: '统计管理',
    //     iconCls:require('../src/assets/tongji.png'),
    //     // iconCls: '../assets/tongji.png',
    //     roles:['sys','operation','managerOperation','personnel'],
    //     children: [
    //         {
    //             path: '/statistics',
    //             name: '药品统计',
    //             roles:['sys','managerOperation','operation']
    //         },
    //         {
    //             path: '/userSpread',
    //             name: '推广统计',
    //             roles:['sys','managerOperation','operation','personnel']
    //         },
    //         {
    //             path: '/patientCount',
    //             name: '统计患者数',
    //             roles:['sys','managerOperation','operation']
    //         },
    //
    //     ]
    // },
    // {
    //     path: '/',
    //     name: '公司管理',
    //     iconCls:require('../src/assets/company.png'),
    //     // iconCls: '../assets/company.png',
    //     roles:['sys','personnel'],
    //     children: [{
    //         path: '/company',
    //         name: '公司管理',
    //         roles:['sys','personnel']
    //     },
    //         {
    //             path: '/staff',
    //             name: '员工管理',
    //             roles:['sys','personnel']
    //         },
    //         {
    //             path:'/pedometer',
    //             name:'计步管理',
    //             roles:['sys','personnel']
    //         }
    //     ]
    // },
    // {
    //     path: '/',
    //     name: '预约管理',
    //     iconCls:require('../src/assets/yuyue.png'),
    //     // iconCls: '../assets/yuyue.png',
    //     roles:['sys','register'],
    //     children: [
    //         {
    //             path: '/register',
    //             name: '预约挂号',
    //             roles:['sys','register']
    //         },
    //         {
    //             path: '/schedual',
    //             name: '排班管理',
    //             roles:['sys','register']
    //         },
    //
    //     ]
    // },
    // {
    //     path: '/',
    //     name: '积分管理',
    //     iconCls:require('../src/assets/integral.png'),
    //     // iconCls: '../assets/yuyue.png',
    //     roles:['sys','register'],
    //     children: [
    //         {
    //             path: '/integral',
    //             name: '积分管理',
    //             roles:['sys','register']
    //         },
    //         {
    //             path: '/indent',
    //             name: '支付订单查询',
    //             roles:['sys','register']
    //         },
    //
    //     ]
    // },
    // {
    //     path: '/404',
    //     name: '',
    //     hidden: true,
    //     roles:["sys","operation","clinic","media",'manageDoctor',"doctor","broker","personnel","register","order","drugs"]
    // },
    // {
    //     path: '*',
    //     hidden: true,
    //     roles:["sys","operation","clinic","media",'manageDoctor',"doctor","broker","personnel","register","order","drugs"],
    //     redirect: {
    //         path: '/404'
    //     }
    // }
]
var getdata={
    get(key){//获取
        return data
    },

}
//筛选
let roleCode=storage.get("roleCode")

for(var i=0;i<route.length;i++){
    if( route[i].roles.indexOf(roleCode)!=-1){
        var child=[]
          if(route[i].children){
                 for(var j=0;j<route[i].children.length;j++){
                      child.push({
                          path:route[i].children[j].path,
                          name:route[i].children[j].name
                      })
                 }


          }
        data.push({
            path:route[i].path,
            name:route[i].name,
            children:child
        })

    }
}
console.log(data)

export  default getdata
