export default {
  async fetch(request, env) {
    // 设置 CORS
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders });
    }

    try {
      const formData = await request.formData();
      const imageFile = formData.get("image");

      if (!imageFile) {
        return new Response(JSON.stringify({ error: "No image provided" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // 调用 remove.bg API
      const removeBgFormData = new FormData();
      removeBgFormData.append("image_file", imageFile);
      removeBgFormData.append("size", "auto");

      const response = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: {
          "X-Api-Key": env.REMOVE_BG_API_KEY,
        },
        body: removeBgFormData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        return new Response(JSON.stringify({ error: errorText }), {
          status: response.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // 返回处理后的图片
      const imageBuffer = await response.arrayBuffer();
      return new Response(imageBuffer, {
        headers: {
          ...corsHeaders,
          "Content-Type": "image/png",
          "Content-Disposition": 'attachment; filename="removed-bg.png"',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};
