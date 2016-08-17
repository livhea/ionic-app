angular.module('starter.services', ['ngCordova.plugins.nativeStorage'])

.service('UserService', function($cordovaNativeStorage) {
    var setUser = function(user_data) {
        var userData = JSON.stringify(user_data);

        $cordovaNativeStorage.setItem("user_data", userData)
        .then(function (value) {
            console.log('-------services 1-->', value);
        }, function (error) {
            console.log(error);
        });
    };

    var getUser = function(successCB, errorCB){
        $cordovaNativeStorage.getItem("user_data")
        .then(function (value) {
            console.log('-------services 2-->', value);
            successCB(JSON.parse(value || '{}'));
        }, function (error) {
            console.log(error);
            errorCB();
        });
    };

    return {
        getUser: getUser,
        setUser: setUser
    };
})

.factory('Blogs', function() {
    var blogs = [
        {
            id: 1,
            title: 'Smoking & Drinking Alcohol – Quit if You Plan to Have a Child',
            face: 'img/blog/smoking.jpe',
            content: '<h4>Smoking &amp; drinking alcohol are habits that are particularly harmful for couples aspiring to be a parent. This post is an attempt to make our readers aware of their harmful effects on your baby even before he or she is conceived.</h4> <h4><strong>Harmful effects of smoking during preconception</strong></h4> <p>Dear friends, in my experience of working with pregnant women over the past 15 years, one of the more unfortunate trend I have observed is an increasing number of women who have picked up the habit to smoke. Its harmful impact when women are pregnant is well documented. And fortunately, most women are aware of it. However, I sometimes get queries from women asking if its fine to smoke before the child is conceived.</p> <p>Well the definitive answer to this query is a <strong>strict NO</strong>. In fact, you should have no trace of nicotine in your blood <strong><u>at least 2-3 months prior to planning for a baby</u></strong>. So if you have been a regular smoker and have now started planning a family, first and foremost take a break. Get rid of this habit by giving yourself a break for as long as it takes. And start planning for a baby only when you are able to control smoking for at least 3 months.</p> <p>Additionally, it’s not just direct smoking you need to guard against. Passive smoking can be as harmful as direct inhaling. So point out anyone who&#8217;s smoking in your vicinity to either stop or step away. And don&#8217;t be shy even if its your colleague in office, someone in public place, your husband or other family members at home.</p> <p>The reason why smoking is bad in this stage is due to the fact that nicotine is a known vasoconstrictor. It constricts your blood vessels including, but not limited to the ones to the placenta and the baby. It also significantly increases the probability of miscarriage, birth defects and other complications. Finally, it has an impact on your (and your husband, if he smokes) fertility as well and reduces your chances of getting pregnant in the first place.</p> <h4>Harmful effects of drinking alcohol during preconception</h4> <p>Alcohol is linked to fetal alcohol spectrum disorder (FASD). Its a growth disorder in children causing problems such as abnormal appearance, short height, low body weight, small head size, poor coordination, low intelligence, behavior problems, and problems with hearing or seeing.</p> <p>As soon as you decide to start planning for a baby, its important for you to abstain from alcohol. A recent study conducted by the British agency Royal College of Obstetricians and Gynaecologists (RCOG) has found that drinking alcohol at the time of conception or during 1<sup>st</sup> trimester is most harmful for the baby and increases chances of miscarriage.</p> <p>Even for men, alcohol in large amounts impacts their sperm quality and chances of passing on bad genes increases. Hence, it’s advisable for fathers-to-be that they too abstain from alcohol when trying to conceive.</p> <p>With this post, we come to end of our preconception series for couples who are planning a child. We hope you had some useful takeaway which should help you plan for a child in the best way. Best of Luck!</p>'
        },
        {
            id: 2,
            title: 'Folic Acid Supplementation and Other Pre-natal Vitamins',
            face: 'img/blog/acid.jpe',
            content: '<h4>FOLIC ACID Supplementation and other Pre-natal Vitamins</h4> <p>Dear friend, when you visit your Obstetrician and mention that you have decided to conceive, she recommends you a dose of folic acid and few other pre-natal vitamins . Let’s try to see why do you need these supplements and follow the advice of your doctor.</p> <h5><strong>Folic Acid and Pregnancy</strong></h5> <p>Folic Acid, also called folate, is a B vitamin. It’s found in abundance in fortified cereals. As far as your baby goes, it plays a critical role in production of red blood cells. It also helps in your baby’s neural tube development into brain and spinal cord.</p> <p>The first 3-4 weeks of your pregnancy are most critical wherein birth defects occur. To prevent any impact on the brain and spinal cord development of your baby, it’s essential to have enough folic acid in your system. If your baby doesn’t receive enough folic acid, it could be born with permanent disability or not able to survive for long, due to incomplete brain development. Folic acid supplementation reduces these risks by over 50%. Additional benefits of folic acid include reducing pregnancy complications (such as pre-eclampsia), heart diseases, stroke, cancer and Alzheimer’s disease.</p> <p>Ideally you should start taking folic acid even before you plan for a pregnancy and most definitely when you have decided to conceive. This would continue even after you’ve become pregnant and delivered your child, till the baby breastfeeds.</p> <p>The recommended daily dosage of folic acid, as per international standards is:</p> <ul> <li>While you&#8217;re trying to conceive: 400 mcg</li> <li>For the first three months of pregnancy: 400 mcg</li> <li>For months four to nine of pregnancy: 600 mcg</li> <li>While breastfeeding: 500 mcg</li> </ul> <br/><p>However, your Gynaecologist / Obstetrician might change this dosage on a case by case basis. Hence, it’s advised to keep her in loop in terms of dosage. Since natural rich sources of folic acid are few and getting enough quantity from food is a challenge, almost all doctors recommend external supplementation, which is the easiest way to get this essential nutrient.</p> <h5><strong>Other prenatal Vitamins and Pregnancy</strong></h5> <p>These days, Gynaecologists recommend prenatal vitamins to women who have decided to conceive and even to those who are pregnant. Folic acid (discussed above) is one of the most important vitamins. Other key vitamins and minerals which are critical as you plan for pregnancy are:</p> <p><strong>Iron</strong>: Iron is a critical component of haemoglobin and responsible for carrying oxygen in blood to various parts of body. It also strengthens immunity, increases resistance to fight stress and disease and prevents anemia in the mom.</p> <p><strong>Vitamin D</strong>: Various researches support Vitamin D’s role in immune function, healthy cell division and bone health. It also plays an important part in absorption and metabolism of calcium and phosphorus.</p> <p><strong>Calcium</strong>: Calcium helps in developing heart rhythm, blood clotting, circulatory, muscular, cardiovascular, and nervous systems. It’s important to have a calcium rich diet before you start your pregnancy.</p> <p><strong>Vitamin</strong><strong> C: </strong>Helps in improving the immune system and keeping sickness at bay. Also reduces preterm delivery risk.</p> <p>Your Obstetrician would recommend you the right set of prenatal vitamins basis your health and diet. If you chose a brand of prenatal vitamins by yourself, be aware of allergens (such as lactose free or gluten free), caffeine, whole food based, additives and wrong kind of Vitamin A (avoid retinol or retin A). Always consult your health care provider with the exact constituents for the best choice of brand.</p>'
        },
        {
            id: 3,
            title: 'Livhea’s Preconception and Pre-pregnancy 7 Part Guide for Planning a Baby',
            face: 'img/blog/preconception.jpg',
            content: '<h4>Preconception Tests and vaccinations</h4> <p>Dear friend, now that you have decided to take steps towards motherhood, you must be asking what tests you need to get done so that your child is born healthy. Well, in this post we will list down various preconception tests that you should be getting done before you conceive. These tests are critical, to understand and reduce possibility of any complications in your pregnancy. They would also help in determining remedial action to mitigate, or even better, stop something adverse from happening.</p> <p>Having said that, it’s also important to understand that if you have already conceived and the result of some these tests are/were not favourable, you don&#8217;t need to stress. Chances are, your pregnancy could still turn out to be absolutely normal with no complications. The rationale for conducting these preconception tests and being aware of any potential issue before your conceive is simple. <strong>Turn the odds in your favour!</strong></p> <h4><strong>Critical preconception tests</strong></h4> <ul> <li>Sugar (blood glucose)</li> <li>Blood pressure</li> <li>Thyroid (TSH test)</li> <li>Blood test</li> <li>Pap Smear</li> <li>Rubella (or German measles) immunity</li> <li>Chickenpox immunity</li> <li>Hepatitis B immunity</li> <li>Herpes</li> <li>STDs (such as chlamydia, syphilis, and gonorrhoea)</li> <li>Others (toxoplasmosis and parvovirus B19)</li> <li>Sickle cell anemia</li> <li>Thalassemia</li> <li>Other conditions, such as toxoplasmosis and parvovirus B19 (also called fifth disease)</li> </ul> <p>For expecting mothers suffering from any condition such as epilepsy, high blood pressure, asthma, diabetes or a thyroid disorder, it&#8217;s especially important to seek out medical care. You should also make your doctor aware of all medication (including over-the-counter) you have been taking so that the doctor can advise you on their side effects.</p> <p>Preconception tests become especially important if you’ve had any of these problems in a past pregnancy:</p> <ul> <li>Miscarriage, when a baby dies in the womb before 20 weeks of pregnancy</li> <li>Stillbirth, <span style="text-decoration: underline;">when</span> a baby dies in the womb after 20 weeks of pregnancy</li> <li>Premature birth, birth that happens too early, before 37 weeks of pregnancy</li> <li>Baby with a birth defect, a problem with the baby’s body that is present at birth</li> </ul> <h4><strong>Preconception Vaccinations</strong></h4> <h5><strong>Rubella </strong></h5> <p>Rubella infection in pregnant women can cause developing babies to have serious birth defects. The impact of the same could be devastating life-long consequences or even death before birth. Ensure that you do a pre-pregnancy blood test to check your immunity against this disease. There’s a high possibility that you are already vaccinated as a child with rubella. Still its good to confirm this with your doctor based on your test results. If the doctor recommends you to get vaccinated, <strong><span style="text-decoration: underline;">avoid becoming pregnant until one month after receiving the Rubella vaccine</span></strong> and, ideally, not until your immunity is confirmed by a blood test</p> <h5><strong>Chicken Pox</strong></h5> <p>Chicken pox in pregnancy can be serious. It’s not only uncomfortable for you, but also risky for the fetus. You should check with the doctor if you need this vaccine (varicella) before you become pregnant (<span style="text-decoration: underline;"><strong>pregnant women should not have this vaccine</strong></span>). If your blood tests reveal you aren’t immune to this disease, your doctor should advice on the right doses and time before you should start to conceive.</p>'
        },
        {
            id: 4,
            title: 'Mother’s Preconception Weight and Impact on Pregnancy',
            face: 'img/blog/preconception-weight.jpe',
            content: '<h4>Mother&#8217;s preconception weight and impact on pregnancy</h4> <p>Dear friends, one of the biggest endemic facing our times is the rising obesity levels amongst our population. Recent studies have pointed the following grim facts:</p> <ul> <li>India has approx. 20 million women suffering from obesity as compared to approx. 10 million men</li> <li>More than 23% of women in the urban area are either overweight or obese compared to only 7% of women in rural areas</li> </ul> <p>These facts point out that more and more number of women are having issues related to their weight. This is primarily caused due to our lifestyle and eating habits. This post is an attempt to understand how mother&#8217;s preconception weight impacts pregnancy. This includes both her ability to get pregnant and also the health of her child.</p> <p>For reference, women with a BMI between 25.0 and 29.9 are considered overweight. Women with a BMI above 30 are considered obese. Women with a BMI less than 18.5 are considered underweight which is also a cause of concern if you are trying to get pregnant.</p> <h4><strong>Weight and fertility</strong></h4> <p>Let’s taker a deeper dive and understand how mother&#8217;s preconception weight impacts the chances of being pregnant.</p> <p>We will first talk about <strong>obesity</strong> and its impact on fertility. Obesity causes hormonal imbalances and problems with ovulation. This is especially true for women who are obese and planning for their first baby. It’s also a major cause of poly cystic ovary syndrome (<a href="http://blog.livhea.com/pcos-management-1/">PCOS</a>), a common cause of infertility in the last 10-15 years. Even if you have decided to go for artificial insemination methods such as IVF, being overweight significantly reduces the probability of success.</p> <p>Being <strong>underweight</strong> is also not healthy and is a cause of concern especially if you are planning for pregnancy. Most underweight women have irregular periods and have problems in ovulation (release of egg) during their menstrual cycle. Research has proven that women need 22% body fat content to have normal cycle. Low body fat impacts the flow of hormones and impedes the release of eggs (despite presence of healthy eggs). Excessive exercising, especially amongst professional athletes, may also lead to irregular periods.</p> <h4><strong>Mother&#8217;s PReconception Weight and pregnancy complications</strong></h4> <p>We now understand that how mother&#8217;s preconception weight impacts the chances of getting pregnant. But it doesn&#8217;t mean that you can&#8217;t get pregnant. You can still get pregnant but the pregnancy becomes more complex if you are suffering from either. You wonder how? So let&#8217;s read ahead&#8230;</p> <p>Overweight and obese women have higher risks of pregnancy related complications such as miscarriage, hypertension, pre-eclampsia, gestational diabetes, infection, blood clotting, need for induction of labour, caesarean birth and stillbirth. While not all overweight or obese women may have any or a combination of these issues, evidence suggests that they are more vulnerable, as compared to those with normal weight.</p> <p>Being underweight before and during pregnancy raises the risk of preterm delivery or the baby born with a low birth weight. It also increases possibility of complications like obstetric surgical interventions and infant suffering from postpartum haemorrhage which can be dangerous to its life.</p> <h4><strong>So what should you do?</strong></h4> <p>Well, the answer is pretty simple &#8211; <strong>Get in shape!</strong> If you are either underweight or overweight and have decided to plan for pregnancy, first and foremost, aim to get your BMI as close as possible within the range of 18.5 and 24.9. The reasons should be quite clear to you by now. Firstly, you are increasing the chances of getting pregnant. And most importantly, you are reducing pregnancy related risks and complications. These risks and complications are dangerous to both you and your child</p> <p>Additionally, <strong>be patient and lose or gain weight naturally. </strong>You should refrain from taking help of external supplements and procedures to get in shape. Don’t go for shortcuts as they can come back to haunt you or your child in the long term. And trust me it’s not worth the risk. The side effects can be terrible. The only way out is by improving your diet (<span style="text-decoration: underline;"><em>with correct guidance only</em></span>) and exercising the right way.</p> <h4>What if I have already conceived?</h4> <p>If you have already conceived and are overweight or underweight, please don’t start stressing about it as things can be managed with right guidance and self-motivation. Try to understand how to gain the right amount of pregnancy weight. There are <a href="http://blog.livhea.com/pregnancy-weight-gain-expectations/">guidelines</a> which suggest how much weight you should gain basis your pre-pregnancy BMI. Ensure that your nutritionist is giving you a plan which helps you achieve the same. Follow the exercise regime as suggested by your gynaecologist and things will be just fine.</p> <p>We wish you the best of luck as you embark this most beautiful journey!</p>'
        }
    ];

    return {
        all: function() {
            return blogs;
        },
        
        get: function(blogId) {
            for (var i = 0; i < blogs.length; i++) {
                if (blogs[i].id === parseInt(blogId)) {
                  return blogs[i];
                }
            }
            return null;
        }
    };
})

.factory('WeekTrack', function() {
    var weeks = {
            '4': {
                motherText: 'Dear Mom, you have been planning to conceive and have missed your period this week. It’s one of the first signs that you are pregnant. If you are also feeling tenderness in your breasts, that’s another sign that I am on my way! Additionally, your sense of taste and smell would get significantly heightened.',
                babyText: 'Mom, you and I have now started this incredible journey which will last for the next 8-9 months. I am really happy to be a part of your life and know that you are going to be an incredible mother to me. I am currently a small embryo and I am of the size of a tiny poppy seed. From this week onwards till the 10th week, all my organs will start developing. And you know, some of them will even start functioning pretty well!'
            },

            '5': {
                motherText: 'Dear Mom, you have been planning to conceive and have missed your period this week. It’s one of the first signs that you are pregnant. If you are also feeling tenderness in your breasts, that’s another sign that I am on my way! Additionally, your sense of taste and smell would get significantly heightened.',
                babyText: 'Mom, you and I have now started this incredible journey which will last for the next 8-9 months. I am really happy to be a part of your life and know that you are going to be an incredible mother to me. I am currently a small embryo and I am of the size of a tiny poppy seed. From this week onwards till the 10th week, all my organs will start developing. And you know, some of them will even start functioning pretty well!'                
            },

            '6': {
                motherText: 'Dear Mom, you have been planning to conceive and have missed your period this week. It’s one of the first signs that you are pregnant. If you are also feeling tenderness in your breasts, that’s another sign that I am on my way! Additionally, your sense of taste and smell would get significantly heightened.',
                babyText: 'Mom, you and I have now started this incredible journey which will last for the next 8-9 months. I am really happy to be a part of your life and know that you are going to be an incredible mother to me. I am currently a small embryo and I am of the size of a tiny poppy seed. From this week onwards till the 10th week, all my organs will start developing. And you know, some of them will even start functioning pretty well!'
            }            
    };

    return {  
        getTrackerForWeek: function(weekNumber) {
            if(weeks[weekNumber]) {
                return weeks[weekNumber];
            }
            return null;
        }
    };
});