import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  function loading() {
    document.querySelector(".load").classList.add("loading");
  }
  function loaded() {
    setTimeout(() => {
      document.querySelector(".load").classList.remove("loading");
    }, 1000);
  }
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }
  const token =
    "patYsOZHgixOhblRW.43d62926524a997f44fe10de714eb9989c9ff6258fbba00bf9a58b3110ea2b77";
  const table = "appNIxkbefxCOZyJV";
  const A = ref("");
  const chooseArray = ref([]);
  const chooseArrayDeleteId = ref({});
  const chooses = ref("");
  const optionObject = ref({});
  getMenudic();
  function getMenudic() {
    chooseArray.value = [];
    chooseArrayDeleteId.value = {};
    // chooses.value = "";
    optionObject.value = {};
    const page = "%E5%BA%97%E5%AE%B6%E9%81%B8%E6%93%87";
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append(
      "Cookie",
      "brw=brwNJctjsRJ49Zc6S; AWSALB=2eMNzt8SkPublfrM3U6W6Z+y/LDSaAk31Esx2cq49vtgM9q8BjOjlhfmosTeJSHE3JwBuFPBO/16kPVpvoAfrTdIGRHa4zhnCy/F0RLKAlUD2lkr7U1C/0pudpfC; AWSALBCORS=2eMNzt8SkPublfrM3U6W6Z+y/LDSaAk31Esx2cq49vtgM9q8BjOjlhfmosTeJSHE3JwBuFPBO/16kPVpvoAfrTdIGRHa4zhnCy/F0RLKAlUD2lkr7U1C/0pudpfC"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://api.airtable.com/v0/${table}/${page}?view=Grid%20view`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        const data = result.records;
        data.forEach((element) => {
          chooseArray.value[chooseArray.value.length] = element.fields["Name"];
          chooseArrayDeleteId.value[element.fields["Name"]] = element["id"];
          const length = Object.keys(element.fields).length - 1;
          makeOptions();
          function makeOptions() {
            optionObject.value[element.fields["Name"]] = [[], {}];
            let count;
            let type;
            for (let i = 0; i < length; i++) {
              if (element.fields[i].endsWith("--")) {
                count = count === undefined ? 0 : ++count;
                type = element.fields[i].replaceAll("--", "");
                optionObject.value[element.fields["Name"]][0][
                  optionObject.value[element.fields["Name"]][0].length
                ] = type;
                optionObject.value[element.fields["Name"]][1][type] = [];
              } else {
                optionObject.value[element.fields["Name"]][1][type][
                  optionObject.value[element.fields["Name"]][1][type].length
                ] = element.fields[i].split("+-+");
              }
            }
          }
        });
        setMenu(chooses.value);
        loaded();
      })
      .catch((error) => console.log("error", error));
  }

  function deleteMenu(id) {
    const page = "%E5%BA%97%E5%AE%B6%E9%81%B8%E6%93%87";
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append(
      "Cookie",
      "brw=brwNJctjsRJ49Zc6S; AWSALB=2mmNaScSneDK/R+DqD+y3eHfP0mbpkqqbg2ScAXmlEmQT3WQebZjOXUBuzY/heNuu2Od2UILCE2TzaX74y3LJXWa36JNXOQleHfypSHgLGxvdnT9UaPW1/4dAXcf; AWSALBCORS=2mmNaScSneDK/R+DqD+y3eHfP0mbpkqqbg2ScAXmlEmQT3WQebZjOXUBuzY/heNuu2Od2UILCE2TzaX74y3LJXWa36JNXOQleHfypSHgLGxvdnT9UaPW1/4dAXcf"
    );

    var urlencoded = new URLSearchParams();
    urlencoded.append("records[]", id);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    // const fetchid = idArray.join("&records[]=");
    fetch(
      `https://api.airtable.com/v0/appNIxkbefxCOZyJV/${page}?records[]=${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        getMenudic();
        // location.reload();
        loaded();
      })
      .catch((error) => console.log("error", error));
  }
  const chooseType = ref([]);
  const chooseMenu = ref({});
  // setMenu("樂品屋");
  function setMenu(menu) {
    const data = menu !== "" ? optionObject.value[menu] : [[], {}];
    // console.log(menu, optionObject.value, data);
    chooseType.value = data[0];
    chooseMenu.value = data[1];
  }
  function updateMenu(content) {
    const page = "%E5%BA%97%E5%AE%B6%E9%81%B8%E6%93%87";
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "brw=brwNJctjsRJ49Zc6S; AWSALB=bbJYhwvzqxm6q0uVMUEBcqC86JKOF23vHHRCyV54DJFmNQe6TUiAHgiqGUznhlNxBrPh3egN8agamDZLbPMD+rd7QiB03obWTdxnQMm5mLsPKzv+FK4Ax0pm3CkM; AWSALBCORS=bbJYhwvzqxm6q0uVMUEBcqC86JKOF23vHHRCyV54DJFmNQe6TUiAHgiqGUznhlNxBrPh3egN8agamDZLbPMD+rd7QiB03obWTdxnQMm5mLsPKzv+FK4Ax0pm3CkM"
    );

    var raw = JSON.stringify({
      records: [
        {
          fields: content,
          // fields: {
          //   1: "2",
          //   Name: "kame",
          // },
        },
      ],
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://api.airtable.com/v0/appNIxkbefxCOZyJV/${page}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // location.pathname = "/GoodIdealsLunch/delete";
        // location.reload();
        // getOrderList();
        deleteId.value = result.records[0]["id"];
        getMenudic();
        loaded();
      })
      .catch((error) => console.log("error", error));
  }
  // const deadline = ref(0);
  const countdown = ref("訂購時間已截止");
  API();
  function API() {
    const page = "%E5%85%B6%E4%BB%96%E8%B3%87%E8%A8%8A";
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append(
      "Cookie",
      "brw=brwNJctjsRJ49Zc6S; AWSALB=2eMNzt8SkPublfrM3U6W6Z+y/LDSaAk31Esx2cq49vtgM9q8BjOjlhfmosTeJSHE3JwBuFPBO/16kPVpvoAfrTdIGRHa4zhnCy/F0RLKAlUD2lkr7U1C/0pudpfC; AWSALBCORS=2eMNzt8SkPublfrM3U6W6Z+y/LDSaAk31Esx2cq49vtgM9q8BjOjlhfmosTeJSHE3JwBuFPBO/16kPVpvoAfrTdIGRHa4zhnCy/F0RLKAlUD2lkr7U1C/0pudpfC"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://api.airtable.com/v0/${table}/${page}?view=Grid%20view`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const date = result.records[0].fields;
        const deadline = new Date(
          date["年"],
          date["月"] - 1,
          date["日"],
          date["時"],
          date["分"]
        );
        const timerId = setInterval(() => {
          var nowTime = new Date();
          const timeLeft = Math.floor((deadline - nowTime) / 1000);

          countdown.value =
            timeLeft > 0
              ? `剩餘時間${Math.floor(timeLeft / 86400)}天${
                  Math.floor(timeLeft / 3600) % 24
                }時${Math.floor(timeLeft / 60) % 60}分${timeLeft % 60}秒`
              : "訂購時間已截止";
          if (countdown.value == "訂購時間已截止") {
            timerStop();
          }
        }, 1000);
        function timerStop() {
          clearInterval(timerId);
        }
        loaded();
      })
      .catch((error) => console.log("error", error));
  }
  const storeName = ref("");
  const menuMeal = ref({});
  const menuTypeArray = ref([]);
  const allMenuArray = ref([]);
  const orderList = ref([]);
  const deleteOrderID = ref([]);
  const otherOrderList = ref([[], {}]);
  const totalMeney = ref(0);
  getOrderList();
  function getOrderList(deleteOption) {
    storeName.value = "";
    menuTypeArray.value = [];
    menuMeal.value = {};
    allMenuArray.value = [];
    orderList.value = [];
    deleteOrderID.value = [];
    otherOrderList.value = [[], {}];
    totalMeney.value = 0;
    console.log("SHOOTER");
    const page = "%E5%8D%88%E9%A4%90%E8%A8%82%E5%96%AE";
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append(
      "Cookie",
      "brw=brwNJctjsRJ49Zc6S; AWSALB=2eMNzt8SkPublfrM3U6W6Z+y/LDSaAk31Esx2cq49vtgM9q8BjOjlhfmosTeJSHE3JwBuFPBO/16kPVpvoAfrTdIGRHa4zhnCy/F0RLKAlUD2lkr7U1C/0pudpfC; AWSALBCORS=2eMNzt8SkPublfrM3U6W6Z+y/LDSaAk31Esx2cq49vtgM9q8BjOjlhfmosTeJSHE3JwBuFPBO/16kPVpvoAfrTdIGRHa4zhnCy/F0RLKAlUD2lkr7U1C/0pudpfC"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://api.airtable.com/v0/${table}/${page}?view=Grid%20view`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        deleteOlder(deleteOption);
        function deleteOlder(deleteOption) {
          if (deleteOption) {
            for (let i = 1; i < result.records.length; i++) {
              deleteOrderID.value[deleteOrderID.value.length] =
                result.records[i]["id"];
            }
            // console.log("1223", deleteOrderID.value);
            deleteOrder(deleteOrderID.value);
          }
        }
        getMenu();
        function getMenu() {
          const storeDate = result.records[0].fields;
          storeName.value = storeDate["Name"];
          let counter;
          let type = "";
          for (
            let index = 0;
            index < Object.keys(storeDate).length - 1;
            index++
          ) {
            if (storeDate[index].endsWith("--")) {
              counter = counter === undefined ? 0 : ++counter;
              type = storeDate[index].replaceAll("--", "");
              menuTypeArray.value[counter] = type;
              allMenuArray.value[Object.keys(allMenuArray.value).length] = type;
              // console.log(allMenuArray.value);
            } else {
              const menuData = [index, ...storeDate[index].split("+-+"), 1];
              allMenuArray.value[Object.keys(allMenuArray.value).length] =
                menuData[1];

              if (menuMeal.value[type] === undefined) {
                menuMeal.value[type] = [];
              }
              menuMeal.value[type][Object.keys(menuMeal.value[type]).length] =
                menuData;
              // console.log("123", menuMeal.value[counter]);
            }
          }
          // console.log("123", menuMeal.value, menuTypeArray.value);

          // menuMeal.value.forEach((e) => {
          //   console.log(Object.keys(e)[0]);
          //   e[Object.keys(e)[0]].forEach((e) => console.log(e[0], e[1]));
          // });
        }

        getOrderList();
        function getOrderList() {
          for (let i = 1; i < result.records.length; i++) {
            const OriginData = result.records[i].fields;
            const data = [];
            let orderInfo = [];
            for (let j in OriginData) {
              if (OriginData[j] === "0") {
                continue;
              } else if (j === "Name") {
                data[0] = result.records[i].fields[j];
              } else {
                const [meal, price] = result.records[0].fields[j].split("+-+");

                if (OriginData[j] === "0") {
                  continue;
                }
                orderInfo[orderInfo.length] = `${meal} ${OriginData[j]}份 ${
                  price * OriginData[j]
                }元`;
                // console.log(orderInfo);
                data[1] = orderInfo.join("<br>");
              }
            }
            data[2] = result.records[i]["id"];
            // console.log(data);
            data[3] = true;
            if (orderInfo.length === 0) {
              continue;
            } else {
              orderList.value[orderList.value.length] = data;
            }
          }
        }
        getOtherList();
        function getOtherList() {
          const orderList = [];
          const orderInfo = {};
          let total = 0;
          const menu = result.records[0].fields;
          for (let i = 1; i < result.records.length; i++) {
            const OriginData = result.records[i].fields;
            const name = OriginData["Name"];
            const keys = Object.keys(OriginData);
            keys.splice(keys.length - 1, 1);
            // console.log(keys, name, menu, OriginData);
            for (let i of keys) {
              // console.log(i,orderList.some((element) => element === menu[i]))
              if (orderList.some((element) => element === menu[i])) {
                // console.log(OriginData["1"], i);
                for (let j = 0; j < Number(OriginData[i]); j++) {
                  orderInfo[menu[i]][orderInfo[menu[i]].length] = name;
                  totalMeney.value =
                    totalMeney.value + Number(menu[i].split("+-+")[1]);
                }
              } else {
                // console.log(orderList,menu[i])
                orderList[orderList.length] = menu[i];
                orderInfo[menu[i]] = [];
                // console.log(orderInfo)

                for (let j = 0; j < Number(OriginData[i]); j++) {
                  // console.log(orderInfo);
                  orderInfo[menu[i]][orderInfo[menu[i]].length] = name;
                  totalMeney.value =
                    totalMeney.value + Number(menu[i].split("+-+")[1]);
                }
              }
            }
            console.log(orderList, orderInfo, totalMeney.value);
            otherOrderList.value = [orderList, orderInfo];
          }
        }
        loaded();
        // console.log(orderList.value);
      })
      .catch((error) => console.log("error", error));
  }
  function order(content) {
    const page = "%E5%8D%88%E9%A4%90%E8%A8%82%E5%96%AE";
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "brw=brwNJctjsRJ49Zc6S; AWSALB=bbJYhwvzqxm6q0uVMUEBcqC86JKOF23vHHRCyV54DJFmNQe6TUiAHgiqGUznhlNxBrPh3egN8agamDZLbPMD+rd7QiB03obWTdxnQMm5mLsPKzv+FK4Ax0pm3CkM; AWSALBCORS=bbJYhwvzqxm6q0uVMUEBcqC86JKOF23vHHRCyV54DJFmNQe6TUiAHgiqGUznhlNxBrPh3egN8agamDZLbPMD+rd7QiB03obWTdxnQMm5mLsPKzv+FK4Ax0pm3CkM"
    );

    var raw = JSON.stringify({
      records: [
        {
          fields: content,
          // fields: {
          //   1: "2",
          //   Name: "kame",
          // },
        },
      ],
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://api.airtable.com/v0/appNIxkbefxCOZyJV/${page}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        // location.pathname = "/GoodIdealsLunch/delete";
        // location.reload();
        getOrderList();
        loaded();
      })
      .catch((error) => console.log("error", error));
  }
  function deleteOrder(idArray) {
    const page = "%E5%8D%88%E9%A4%90%E8%A8%82%E5%96%AE";
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append(
      "Cookie",
      "brw=brwNJctjsRJ49Zc6S; AWSALB=2mmNaScSneDK/R+DqD+y3eHfP0mbpkqqbg2ScAXmlEmQT3WQebZjOXUBuzY/heNuu2Od2UILCE2TzaX74y3LJXWa36JNXOQleHfypSHgLGxvdnT9UaPW1/4dAXcf; AWSALBCORS=2mmNaScSneDK/R+DqD+y3eHfP0mbpkqqbg2ScAXmlEmQT3WQebZjOXUBuzY/heNuu2Od2UILCE2TzaX74y3LJXWa36JNXOQleHfypSHgLGxvdnT9UaPW1/4dAXcf"
    );

    var urlencoded = new URLSearchParams();
    addDeleteId(idArray);
    function addDeleteId(idArray) {
      idArray.forEach((id) => {
        urlencoded.append("records[]", id);
      });
    }
    // urlencoded.append("records[]", id);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    const fetchid = idArray.join("&records[]=");
    fetch(
      `https://api.airtable.com/v0/appNIxkbefxCOZyJV/${page}?records[]=${fetchid}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        getOrderList();
        loaded();
        // location.reload();
      })
      .catch((error) => console.log("error", error));
  }
  const cartList = ref([]);
  const name = ref("");
  getname();
  function getname() {
    if (localStorage.name !== undefined) {
      name.value = localStorage.name;
    }
  }
  function setname(name) {
    localStorage.name = name;
  }
  const deleteId = ref("");

  function setdeadline(content) {
    const page = "%E5%85%B6%E4%BB%96%E8%B3%87%E8%A8%8A";
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "brw=brwNJctjsRJ49Zc6S");
    // console.log()
    var raw = JSON.stringify({
      records: [
        {
          id: "recchd6VEui0IH6Ir",
          fields: content,
          // {
          //   年: 2023,
          //   月: 5,
          //   日: 19,
          //   時: 12,
          //   分: 0,
          // },
        },
      ],
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://api.airtable.com/v0/appNIxkbefxCOZyJV/${page}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        // console.log(result);
        API();
        loaded();
      })
      .catch((error) => console.log("error", error));
  }
  function startOrder(content) {
    const page = "%E5%8D%88%E9%A4%90%E8%A8%82%E5%96%AE";
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "brw=brwNJctjsRJ49Zc6S");
    // console.log()
    var raw = JSON.stringify({
      records: [
        {
          id: "recRcqQtlsrBhKWp1",
          fields: content,
          // {
          //   年: 2023,
          //   月: 5,
          //   日: 19,
          //   時: 12,
          //   分: 0,
          // },
        },
      ],
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://api.airtable.com/v0/appNIxkbefxCOZyJV/${page}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        // console.log(result);
        API();
        getOrderList(true);
        loaded();
      })
      .catch((error) => console.log("error", error));
  }
  return {
    count,
    doubleCount,
    increment,
    countdown,
    order,
    deleteOrder,
    storeName,
    menuMeal,
    menuTypeArray,
    allMenuArray,
    cartList,
    orderList,
    chooseArray,
    chooseMenu,
    chooses,
    chooseType,
    setname,
    name,
    optionObject,
    setMenu,
    deleteMenu,
    chooseArrayDeleteId,
    updateMenu,
    deleteId,
    getMenudic,
    setdeadline,
    startOrder,
    totalMeney,
    otherOrderList,
    loading,
  };
});
