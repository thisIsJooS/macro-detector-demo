(function(global) {
    let mouseArray = [];
    let lastX = window.screenX;
    let lastY = window.screenY;
    let macroDetected = false; // 매크로 탐지 상태를 추적하는 변수

    document.addEventListener("mousemove", (event) => {
        const x = event.clientX;
        const y = event.clientY;

        // x 또는 y 좌표가 1 이상 이동했을 때만 배열에 저장
        if (x !== lastX || y !== lastY) {
            lastX = x;
            lastY = y;
            mouseArray.push({ x, y });
        }
    });

    async function requestLambda() {
        const url = "https://q39x4vmirk.execute-api.ap-northeast-2.amazonaws.com/convature";

        const xCoords = mouseArray.map((point) => point.x);
        const yCoords = mouseArray.map((point) => point.y);
        const postData = {
            x: xCoords,
            y: yCoords,
        };

        console.log(postData);

        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Mean Curvature:", data.values["MeanCurvature"]);
                console.log("Max Curvature:", data.values["MaxCurvature"]);
                console.log("Min Curvature:", data.values["MinCurvature"]);
                console.log("Curvature Std:", data.values["CurvatureStd"]);
                console.log("isMacro:", data.isMacro);
                if (data.isMacro) {
                    macroDetected = true;
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        mouseArray = [];
    }

    function initMacroDetector() {
        const target = document.getElementById("macro-detect-target");

        target.addEventListener("click", async () => {
            await requestLambda();

            if (macroDetected) {
                alert("다시 시도해 주십시오.");
            }

            macroDetected = false;
        })


        document.addEventListener("click", async () => {
            mouseArray = [];
        });
    }

    global.initMacroDetector = initMacroDetector;
})(window);
