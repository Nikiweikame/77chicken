import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }
  const token =
    "patYsOZHgixOhblRW.43d62926524a997f44fe10de714eb9989c9ff6258fbba00bf9a58b3110ea2b77";
  const table = "appNIxkbefxCOZyJV";
  const A = ref("");
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
        setInterval(() => {
          var nowTime = new Date();
          const timeLeft = Math.floor((deadline - nowTime) / 1000);

          countdown.value =
            timeLeft > 0
              ? `剩餘時間${Math.floor(timeLeft / 86400)}天${
                  Math.floor(timeLeft / 3600) % 24
                }時${Math.floor(timeLeft / 60) % 60}分${timeLeft % 60}秒`
              : "訂購時間已截止";
        }, 1000);
      })
      .catch((error) => console.log("error", error));
  }
  function order(content) {
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
      "https://api.airtable.com/v0/appNIxkbefxCOZyJV/%E5%8D%88%E9%A4%90%E8%A8%82%E5%96%AE",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
  function deleteOrder(idArray) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append(
      "Cookie",
      "brw=brwNJctjsRJ49Zc6S; AWSALB=2mmNaScSneDK/R+DqD+y3eHfP0mbpkqqbg2ScAXmlEmQT3WQebZjOXUBuzY/heNuu2Od2UILCE2TzaX74y3LJXWa36JNXOQleHfypSHgLGxvdnT9UaPW1/4dAXcf; AWSALBCORS=2mmNaScSneDK/R+DqD+y3eHfP0mbpkqqbg2ScAXmlEmQT3WQebZjOXUBuzY/heNuu2Od2UILCE2TzaX74y3LJXWa36JNXOQleHfypSHgLGxvdnT9UaPW1/4dAXcf"
    );

    var urlencoded = new URLSearchParams();
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
    const fetchid =idArray.join("&records[]=")
    fetch(
      `https://api.airtable.com/v0/appNIxkbefxCOZyJV/%E5%8D%88%E9%A4%90%E8%A8%82%E5%96%AE?records[]=${fetchid}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
  return { count, doubleCount, increment, countdown, order };
});
