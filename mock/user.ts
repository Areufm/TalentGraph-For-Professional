import type {
  LoginRequest,
  LoginResponse,
  UserInfoResponse,
  RefreshTokenResponse,
} from "../src/types/mock";

export default [
  {
    url: "/api/login",
    method: "post",
    response: (req: LoginRequest): LoginResponse => {
      console.log("req", req);
      const { username, password } = req.body;
      if (username === "111111" && password === "111111") {
        return {
          code: 200,
          data: {
            accessToken: "fake-access-token",
            refreshToken: "fake-refresh-token",
            id: 1,
          },
          message: "Login successful",
        };
      } else {
        return {
          code: 400,
          message: "Invalid username or password",
        };
      }
    },
  },
  {
    url: "/api/getUserInfo",
    method: "get",
    response: (req): UserInfoResponse => {
      console.log("req", req);

      const { accesstoken } = req.headers;
      if (accesstoken === "fake-access-token") {
        return {
          code: 200,
          data: {
            id: 1,
            name: "x0r",
            age: 19,
            phone: "123-456-7890",
            email: "johndoe@example.com",
            area: "",
            education: [
              {
                school_name: "",
                school_time: ["", ""],
                school_degree: "",
              },
            ],
            work: "",
            skill: [],
            info: "尊敬的各位老师、同学们，大家好！我是来自XX大学XX学院XX专业的XXX，非常荣幸有机会在此向大家作一个详细的自我介绍。首先，关于我的基本情况。我出生于美丽的XX省XX市，自小在父母的悉心教诲和良好家庭氛围的影响下，养成了积极向上、勤奋刻苦的生活态度。高中时期，我凭借优异的成绩考入了心仪的XX大学，开始了我的大学生涯。现就读于XX专业，年级排名前X%，对所学专业怀有深厚的兴趣和热情。在学术方面，我始终秉持严谨治学的精神，积极参与各类专业课程的学习与实践。我对XX领域的理论知识进行了深入研究，尤其对XX专题有独到的理解和探索。此外，我还通过阅读专业文献、参加学术讲座和研讨会，不断拓宽视野，紧跟学科前沿动态。至今，我在导师的指导下参与了一项校级科研项目——“XXX”，负责XX部分的工作，项目成果已发表于《XX期刊》。这些学术经历不仅提升了我的专业知识水平，也锻炼了我的独立思考和团队协作能力。在实践能力方面，我深知理论与实践相结合的重要性。在校期间，我积极参与各类实践活动以提升自己的综合素质。曾担任XX社团的副社长，组织策划了多次大型活动，如“XX文化节”、“XX论坛”，在活动筹备过程中，我提升了组织协调、沟通交流以及危机应对的能力。同时，我利用寒暑假时间进行了与专业相关的实习，曾在XX公司担任XX岗位实习生，负责XX工作。实习期间，我将所学知识应用于实际工作中，深化了对专业知识的理解，也积累了宝贵的社会工作经验。对于个人兴趣爱好，我热衷于XX（比如阅读、摄影、运动等）。阅读让我在快节奏的学习生活中保持内心的宁静，从各类书籍中汲取知识、启迪思维；摄影则帮助我捕捉生活中的美好瞬间，培养了我观察事物的独特视角；而定期的体育锻炼，如跑步、篮球等，既强健了体魄，也磨炼了意志，使我更好地应对学习和生活的挑战。展望未来，我深感责任重大、使命光荣。我计划在完成本科学业后继续深造，攻读XX方向的研究生学位，进一步提升专业素养，致力于在XX领域做出自己的贡献。同时，我也期待在未来的学术研究和职业发展中，能够与志同道合的伙伴们携手共进，共同推动行业进步，服务社会。最后，我想说，我是一个热爱生活、积极进取的人，始终坚信“学无止境，行者无疆”。在接下来的大学生活中，我将继续努力学习，全面提升自己，以期在未来的人生道路上，实现自我价值，为社会的发展贡献自己的一份力量。谢谢大家！以上就是我的自我介绍，如果有任何问题或想要进一步了解我，非常欢迎各位老师和同学随时与我交流。再次感谢大家的倾听！",
          },
          message: "User info fetched successfully",
        };
      } else {
        return {
          code: 401,
          message: "Invalid token",
        };
      }
    },
  },
  {
    url: "/api/refreshToken",
    method: "post",
    response: (req): RefreshTokenResponse => {
      const { refreshtoken } = req.query;
      if (refreshtoken === "fake-refresh-token") {
        return {
          code: 200,
          data: {
            accessToken: "new-fake-access-token",
            refreshToken: "new-fake-refresh-token",
          },
          message: "Token refreshed successfully",
        };
      } else {
        return {
          code: 401,
          message: "Invalid refresh token",
        };
      }
    },
  },
  {
    url: "/api/upload",
    method: "post",
    response: (): UserInfoResponse => {
      return {
        code: 200,
        data: {
          id: 1,
          name: "x0r",
          age: 19,
          phone: "123-456-7890",
          email: "johndoe@example.com",
          area: "",
          education: [
            {
              school_name: "",
              school_time: ["", ""],
              school_degree: "",
            },
          ],
          work: "",
          skill: [],
          info: "Experienced front-end developer",
        },
        message: "File uploaded successfully",
      };
    },
  },
];
