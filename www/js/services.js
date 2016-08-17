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
            },

            '7': {
                motherText: 'Dear Mom, this is the time when you will start feeling more changes in your body. These may not be apparent from outside. You might suffer from nausea in the morning and your breast tissue would have started growing due to which they would feel tender. You might have put on some weight and would have felt that your clothes are getting tight. In case, you haven’t put on weight, please don’t worry as this may be due to nausea. Also, dear mother, you might have noticed the pregnancy glow on your skin. But don’t be surprised if your skin reacts to hormones and breaks-out.',
                babyText: 'Mom, you will be happy to know that my body has started growing now. My upper and lower limbs have started to offshoot from buds. My heart, lungs, intestines, appendix, brain, spinal cord, nostrils, mouth and eyes have also started developing. If you could take a peek, you would be able to see my brain developing inside my transparent skull. Did you know, that my cells are growing at a rate of 100,000 cells per minute (I am already very smart!). I have started moving as well, but will not trouble you till you are in your fourth month of pregnancy.'
            },

            '8': {
                motherText: 'Dear Mom, as your blood volume increases during this period, remember your heart has to work more efficiently and hence, your heart pumps 50% more blood per minute. Also, mood swings are quite common during this period. You might have strong cravings for particular foods, which may prevent you from following a healthy diet plan. I am right now too small for you to start eating for two people :). You only need about extra 300 calories at this point of time (600 in case I have a twin!) to fulfil my nourishment needs. So I urge you to follow a healthy diet and don’t give in to all cravings that you might have.',
                babyText: 'Mom, this is a big week for my growth. My eyelid folds and ears have started forming. I have started developing little webbed fingers and toes and have even learnt to swim in your beautiful womb. I have also developed the tiny tip of my nose along with the upper lip. You would be happy to know that my heart is now starting to grow stronger every day.'
            },

            '9': {
                motherText: 'Dear mom, your uterus has started growing but it will still not be noticeable to others. Also you wouldn’t have gained much weight especially if you have food aversions, cravings, heartburn, indigestion or nausea. Mom, as the volume of your blood increases, you might feel its effects through dizziness, frequent urination, bulging of veins on your hands and feet or in some cases even bleeding from your nose. Don’t worry too much if you show these symptoms as this extra blood volume provides the safety for loss of blood during labour. However, if you have vaginal bleeding you should go to your doctor. It could be either the sign of implantation of embryo or in a worst case scenario, miscarriage.',
                babyText: 'Mom, I have started growing fast and my muscles are growing stronger day by day. If you got an ultrasound, you might have seen me moving though you may not have felt it. But this week, you might be able to hear my heartbeat using a handheld Doppler. Even if you don’t, please don’t be too concerned as I might not be in the right position for you to hear my sounds. Also, my pancreas, gall bladder and reproductive organs have started growing now. My head has doubled in size and covers almost half of my body. My fingers have also started growing longer and its ends are enlarged now. This is where I will form my unique fingerprints.'
            },

            '10': {
                motherText: 'Dear mom, your uterus is continuing to grow and I am receiving all the nourishment I need, inside it. In case you haven’t, you might want to start wearing loose clothes to feel more comfortable. If you get mood swings, please don’t be too concerned as this is quite common and temporary. Your skin would also start showing the ‘pregnancy glow’. Glands which produce milk to feed me in the future have started growing.',
                babyText: 'Mom, this is a big week in the course of my development. Till now, in medical language I was classified as an embryo but by the end of this week I will be classified as a fetus. Most importantly, I am now much less vulnerable to dangers. While I am still small in size, my arms and legs are now longer and can bend at the elbows and knees. My webbed hands and feet will now start separating into fingers and toes. Bones will begin to harden and kidneys will now start producing urine.'
            },

            '11': {
                motherText: 'Dear mom, by now you would have started noticing the effect of hormones. Some of it would be good such as your hair, fingernails and toenails growing faster and some not so good such as oily skin and acne. Mom, do remember different mothers show different symptoms, so in case you don’t have these symptoms or all these symptoms, don’t worry too much. Your uterus would by now would have grown to the size of grapefruit and when you meet the doctor next, she will be able to feel its top.',
                babyText: 'Mom, I continue to grow faster than ever. The bones of my face have started forming. While my eyelids are still closed and would not open for another few months, my ear buds have started taking the shape of my ears. My head now forms one-third of my body, which is straightening and the fingers and toes have started separating. If you are lucky, you will be able to clearly hear my heartbeat (rapid “swooshing”) now with the help of doctor’s stethoscope.'
            },

            '12': {
                motherText: 'Dear mom, as your first trimester comes to a close, your uterus will start putting pressure on the bladder. Your belly would start becoming slightly rounded. Soon, I will be visible and people would know that I am there. So say “Hi!” to everyone from my side if you haven’t told them that you are carrying me in your womb ☺. Mom, there is a chance that you might feel symptoms such as harder stool due to increased blood volume and heartburn due to hormonal changes. These are pretty normal during this stage so don’t worry too much. ',
                babyText: 'Mom, I am now developing my reflexes. I have started opening and closing my fist, started initial movements towards sucking, curling my toes and jerking my arms and legs. But if you don’t feel it yet, don’t be concerned. Remember, I am just 2 inches tall at this point of time. Give me some more time and you will soon start feeling my kicks.'
            },

            '13': {
                motherText: 'Dear Mom, welcome to the end of the 1st trimester! Your uterus would have now grown considerably, filling the pelvis and growing towards your abdomen. It should feel like a soft, smooth ball. From now onwards your morning sickness will reduce to a great extent and you will start feeling much better. Your breasts would have started producing colostrum which will be critical in feeding me. Mom, you might feel the impact of relaxin, a hormone which loosens your ligaments and joints in your pelvis in preparation for my birth. However, its impact is sometimes extended to your hands and feet as well.',
                babyText: 'Mom, I am growing in size every day. My eyes are now moving into position. My ankles and wrists have formed and even though my head is huge as compared to other parts, the body is catching up in size. My nose and lips have also been formed and I might have started urinating (oops!). The good thing is that most of my essential organs have developed by now. And yes, I have grown to become big at almost 3 inches now! '
            },

            '14': {
                motherText: 'Dear mom, congratulations for entering the second trimester, or as I call it, the feel good trimester. The next few weeks are going to be the best part of your pregnancy, so enjoy it to the fullest. The first sign would be that your appetite would start improving and your energy levels would also start increasing. There might be a small possibility that you will continue to feel uneasiness throughout your pregnancy. But worry not, after being born I will give you a tight hug to make it worth it ☺. You would also feel your skin and muscle and stretching to accommodate for my growth.',
                babyText: 'Mom, I am now between 3 to 4 inches tall. I have started sucking my thumb, which will help to create my cherubic cheeks. While we won’t know whether I am a boy or a girl till I am born, but if I am a boy my prostrate has started forming and if I am a girl my ovaries have started moving down towards my pelvis. My brain continues to grow and facilitates movement of body parts allowing me to grasp things. The rest of my body has now started catching up with my brain. My neck is getting longer and my chin has now become prominent. Moreover, I have started developing hair growth on my body (called Lanugo). Don’t be surprised if you feel me reacting to any external stimulus.'
            },

            '15': {
                motherText: 'Dear mom, by now you would have developed a noticeable bump below your belly button. You would have also observed some changes on your skin such as darkening around your nipples, areolas, navel, armpits and inner thighs. These are very common symptoms. Sometimes this darkening is also visible around the eyes, nose and cheeks. But don’t worry as these should fade within a couple of months of me being born. Also, ligaments that support your uterus are growing continuously and may lead to abdominal pain.',
                babyText: 'Mom, my body is covered with fine hair, called Lanugo, which I should be able to shed before my birth. My bones have started becoming harder. I have started kicking, curling toes and making arm movements inside your womb. I have started learning to breathe, suck and swallow; the necessary skills to survive when I am in your arms and outside the womb.'
            },

            '16': {
                motherText: 'Dear Mom, in the next 3-4 weeks you would start feeling my movements, which doctors call “quickening”. Initially these would be very subtle and you might feel it like it’s a gas bubble or some movement due to indigestion and if I am your first born you might even have difficulty detecting it. But actually it’s my kicks that you are experiencing! Also, due to my growing needs there would be an increase in your blood volume (and remember to take enough iron in your food ☺). As a result you might have nosebleeds and the veins in your leg becoming more apparent.',
                babyText: 'Mom, if you go the doctor’s office, you will hear my heartbeat. The fine hair on my body, called lanugo that I discussed earlier, continue to grow on my head. My nervous system is functioning well and my arms and legs are also moving. Even my bones have started to harden. But don’t worry; they will remain flexible for me to pass through your birth canal. You will be happy to know that my umbilical cord has also developed with one vein and two arteries.'
            },

            '17': {
                motherText: 'Dear mom, you would have started looking pregnant by now and gained 3-5 kg of weight. I am sure people around are passing you lots of compliments and giving you special treatment. Also, you would have noticed an increase in your appetite. From now on, you would start gaining weight every week which is important for both of us.',
                babyText: 'Mom, I have nearly doubled in size in the last 2 weeks. My body is forming fat which is helping in producing heat and metabolism. My lungs, circulatory and urinary systems have started functioning. My arms, legs and trunk have grown to become proportionate to my head. I will also start looking chubbier this week as the body fat is deposited under my skin and the sweat glands have started developing.'
            },

            '18': {
                motherText: 'Dear mom, your uterus would have grown more and it must be under your navel. You must have started feeling my movements by now. Don’t worry if you don’t feel my kick every day as I am still developing my strength. Mom, I hope you are doing your exercises (walk, yoga etc.) regularly, unless your doctor has advised complete bed rest. Your heart needs to work 40-50% harder to support both of us and for that you need to do about 30 mins of simple exercise every day.',
                babyText: 'Mom, from now onwards I will start growing slowly as most of my body has developed and the focus would be more on reflex development. I have started yawning, stretching, making facial expressions and even frowning. Also mom, this is the right time for you and dad to start talking to me. My ears are now able to hear and I would love to hear your voices. I would also love to hear the music you and dad like or any stories you want me to tell.'
            },

            '19': {
                motherText: 'Dear mom, are you feeling body ache or pain in lower abdomen, dizziness, heartburn, constipation, leg cramps, mild swelling of ankles or a headache? If yes, firstly don’t get worried as these are common symptoms. You can improve your posture by standing up straight when you walk so your hips and shoulders stay lined up. Also try to sit with feet slightly elevated on the chair or sleeping on the side in fetal position (just like me!).',
                babyText: 'Mom, my skin has started developing and looks transparent and red as my blood vessels are visible through it. At the same time, my skin is now covered with a protective coating called vernix. This coating will help me regulate my temperature and protect my skin in your womb. If you are able to hear my heartbeat you would feel it twice as fast as yours, which is quite normal.'
            },

            '20': {
                motherText: 'Dear mom, this week calls for a celebration. You have reached the midpoint of your pregnancy. Just a few more weeks and I will be in your arms. Yay!!! You might start sweating more as your thyroid gland is more active and your breathing may also become deeper. Mom, you have to be careful of bladder infections as a few muscles in your urinary tract relax during this period. Remember, pain in abdomen, hip, groin and ligaments is quite normal during these few weeks.',
                babyText: 'Mom and Dad, do continue to talk to me, and play the music you like. Please don’t worry if sometimes I startle and jump in your tummy if the sound is loud ☺. My limbs are continuing to grow by curling, flexing and kicking. I have started looking more and more like you and dad as my hair, nails and eyebrows continue to sprout.'
            },

            '21': {
                motherText: 'Dear mom, you must be looking very beautiful right now. These nine months are hopefully going to be the most amazing in your life and I am sure you are appreciating your newfound voluptuousness. Are you proudly showing off your belly or are you hiding it under a tented top? I hope it’s the former ☺',
                babyText: 'Mom, I have now started gaining fat to keep myself warm. Most of my organs are now maturing, albeit at a slower growth than earlier. My teeth buds have started forming this week. After this week, my growth will again spurt as my stomach is now able to absorb energy-boosting nutrients from the amniotic fluid I am swallowing.'
            },

            '22': {
                motherText: 'Dear mom, hopefully your morning sickness has abated and you probably feel a whole lot better now. Don’t worry if you have got cramps in your leg or foot, or have mild swelling of feet and ankles. Mom, if you feel dizzy, it’s quite normal as your blood has thickened and it can’t travel as fast as it used to. You would also see a spurt in the growth of your hair and nails. In case you want to remove some unwanted hair, don’t use any bleach or depilatories as they might contain unsafe chemicals.',
                babyText: 'Mom, I am getting stronger every week. My transparent see-through skin is now becoming opaque, but it will take some time to develop fully. One new development that you would definitely be interested in knowing is that I’ve also started developing my sense of touch. Due to this I will move a lot and you might feel that movement. Also, my eyebrows and my scalp have started growing hair though don’t be surprised if I am born bald ☺'
            },

            '23': {
                motherText: 'Dear mom, I want you to focus strongly on your nutritional needs. As I would be taking nutrients from your body, I don’t want you to start suffering. Please follow the advice of your doctor and take the supplements of various vitamins and minerals. In case you don’t take enough iron, you will feel tiredness, fatigue, weakness and even dizziness. Similarly, if you are not meeting the additional calcium needs, your bones will become weak and you might suffer from osteoporosis later in your life. If any part of your body hurts, try getting some massages or applying a heating pad or hot water bottle. Finally, mom you need to visit your doctor in case you have vaginal secretions which are either smelly or not clear-to-yellowish colour.',
                babyText: 'Mom, this week my skin will continue to develop. My brain is also developing now which will control basic life functions. Also, my lungs have started producing surfactant which enables the air sacs to inflate and lungs to fully expand. This will ensure that I am ready to breathe air when I am out of your womb! '
            },

            '24': {
                motherText: 'Dear mom, you are now close to the 3rd trimester! Over the next couple of weeks you need to get your blood sugar levels measured to test for gestational diabetes. You might notice some psychological changes or urges but remember they are driven by the changes in your body so don’t worry too much!',
                babyText: 'Mom, I have started developing my immunity with the formation of white blood cells. You might have felt my hiccup by now as well and you will realize I’ve become quite busy inside your womb. I am able to hear quite well and I am enjoying the soothing music and talks with you and dad. Also, you and dad might be able to hear my heartbeat by putting an ear to your abdomen.'
            },

            '25': {
                motherText: 'Dear mom, your uterus must have grown upwards, with the top midway between your breasts and belly button and the middle will grow longer and wider. I want you to be careful about developing hemorrhoids due to increased blood flow, constipation, indigestion and heartburn. Mom, in case you develop symptoms of carpal tunnel syndrome, which causes numbness and tingly fingers, don’t worry as this would go away once I am born.',
                babyText: 'Mom, I continue to grow into my skin. By this time you would have most probably heard my heartbeat either by the stethoscope or by putting your ear against my belly. Also, my first bowel movement is forming in my large intestine. Remember that once I am born, I will pass a thick, dark poop which is called meconium and is a signal of my good health.'
            },

            '26': {
                motherText: 'Dear mom, I hope you can feel my movements now. You might feel some pain in your ribs as I grow and push upwards towards your rib cage. Indigestion and heartburn are common due to this. Similarly, you might feel stich-like pains on the side of your abdomen. Also mom, please don’t stress about the weight that you have gained in your pregnancy (approx. 7-8 kgs till now, or even more in some case). Remember that it’s a natural necessity and I am sure you will be back to your pre-pregnancy weight and looks soon after my birth ☺',
                babyText: 'Mom, couple of things are happening at my end. One, I can hear things quite clearly as my hearing is now fully developed. You might have already felt me move in rhythm to the music you would have played. Second, I now have a sleep cycle and you will start seeing patterns in the timings of me being active and kicking and sleeping. I hope our timings are coordinated and I am not troubling you too much when your rest!'
            },

            '27': {
                motherText: 'Dear mom, are your stretch marks visible? This is fairly common as your uterus expands and you should have gained about 8-11 kgs by now. You must be careful about your balance and mobility. Mom, one great aspect about pregnancy is that you will start becoming more assertive and I just love that additional confidence in you!',
                babyText: 'Mom, does your belly sometimes jump? Even if you haven’t seen it, you must have felt it. Well, if you are wondering what causing this sensation, it’s actually my hiccups. Also, my hands are now fully active and I’ve learnt my favorite art of thumb-sucking (good luck getting rid of that!). Oh, by the way, I can cry now, so best of luck!'
            },

            '28': {
                motherText: 'Dear mom, you must have felt some leg cramps or experienced mild swelling of ankles and feel. This coupled with difficulty in sleeping, shortness of breath, clumsiness or lower abdominal achiness is primarily due to the growth of my size and my increased strength. Are you trying some relaxation techniques to reduce this physical stress? If not, you should please try it whenever you feel tired.',
                babyText: 'Mom, from this week onwards, I have started opening and closing my eyes for the first time. I have grown to a size of about 16 inches head to toe and weigh about 1-1.2 kg. I have also started dreaming as evident by my rapid eye movement (REM) sleep. '
            },

            '29': {
                motherText: 'Dear mom, while there’s still some time for me to born, I want to caution you about signs of premature labour. These include menstrual-like cramps or lower back pain, a trickle of amniotic fluid, or a watery pinkish or brownish discharge preceded sometimes by the passage of a thick, gelatinous mucus plug. If you witness any such symptom, get in touch with your doctor immediately. Other than that, in this trimester your breasts will start forming colostrum, which is a kind of precursor to breast milk. In case its flow is greater than a drop or two, you can consider buying nursing pads to control things.',
                babyText: 'Mom, you will be happy to know that my eyes are almost blue in color and I can now start differentiating between the bright sunlight or artificial light through your uterine wall. Also, you must be feeling (and hopefully enjoying) all the kicking and stretching I am doing inside your womb!'
            },

            '30': {
                motherText: 'Dear mom, can you believe that I will be out of your womb in about 10 weeks from now? Isn’t it exciting? Don’t worry if you are feeling itchy. This is quite common so you can ask your doctor about what cream or ointment to use if the sensation is unbearable. Also don’t take too much tension about the stretch marks as these are quite common as well and they will fade significantly over time after my birth. ',
                babyText: 'Mom, I am close to 17 inches tall and weigh about 1.5 kg. I have become plumper and am able to control my temperature. I will continue to gain about 0.25 kg every week from now onwards. You will feel my movements becoming less frequent, but that’s due to the fact that I don’t have too much space to maneuver. However, if you don’t feel an occasional kick, do bring this up with your doctor. '
            },

            '31': {
                motherText: 'Dear mom, are you feeling pain in your hips and lower back? If yes, this is because your hormones have started to relax your ligaments and tendons throughout your pelvic area. This will help your bones to make room for delivery. Also, the pressure of your expanding uterus on the static nerve triggers numbness in the area from your lower back to buttock. This should become less intense over the course of next couple of weeks.',
                babyText: 'Mom, if you could see me, you will find now find me in the fetal position as I have not much space left to stretch. After all I am gaining more height and weight now. Also, my reproductive organs are forming this week.'
            },

            '32': {
                motherText: 'Dear mom, due to my pressing on your internal organs you would notice symptoms such as heartburn, urine leakage and breathlessness. Chances are that they will increase during these last few months. You might start feeling a loss of appetite but you should continue to eat as per the advice of your caregiver. ',
                babyText: 'Mom, great news! By crossing this week successfully, the chances of me being born healthy without development issues go significantly up. I have now grown close to 19 inches tall and weight around 2 kgs. I have practice opening my eyes as well as breathing. Under my skin, a layer of fat has started forming. While there’s not much space left in your uterus, I am still able to sneak some somersaults.'
            },

            '33': {
                motherText: 'Dear mom, of the weight you are gaining now, half is being contributed by me! If you feel contractions, it may not be a sign of me ready to come out. In most cases, it’s your body practicing and getting you (and your mind) ready for labor. How to know if these contractions are temporary? Just sit down with your feet up and drink some water and you will most probably see them subsiding. In case these continue for more than couple of hours, then you need to see our doctor!',
                babyText: 'Mom, as I said above, I am now gaining weight fast and in fact I will gain half of my birth weight in the next few weeks. You would have felt less movement from my end, but that’s because I have little room to move and curl inside your womb and I am lying with my knees bent, chin resting on my chest and my arms and legs are crossed.'
            },

            '34': {
                motherText: 'Dear mom, you might be having backaches in this period. This is because your pelvis has expanded. Luckily you will stop gaining weight from this time onwards. Don’t be surprised if you are unable to see your feet ☺. If you feel comfortable sleeping in a bra, know that it’s quite normal. Most importantly dear mom, don’t worry too much about anything. I will be in your arms in a short time from now…',
                babyText: 'Mom, I am really excited and can’t wait to come out. I am weighing close to 2.5 kgs and have grown close to 20 inches tall. Most of my organs are now fully mature, with the exception of my lungs, skin and toenails. I am settling into the head-down position, though this might change over the course of next few weeks. I hope you have started talking to a lactation expert or taken advice from your friends and relatives as it would be very useful when the time comes to feed me.'
            },

            '35': {
                motherText: 'Dear mom, from this week onward, look out for extra thick vaginal discharge which is also known as mucus plug dropping. Do let our doctor know if this happens. This plug keeps your uterus safe from germs though its loss doesn’t mean that you are going into labor immediately. Also, between now and 37 weeks, your doctor will be testing you from Group B streptococcus bacteria.',
                babyText: 'Mom, my lungs are now almost fully developed and I continue to have fat deposits beneath my skin to remain warm after I come out of your womb. Mom, by now my position would be stable. There is a small possibility that my head is not facing down towards the cervix and vagina. This means that my feet or butt would come out first. This is also known as breech position which is common in less than 5% of cases globally. If I am in this position, chances that I will be born via C-Sec are slightly more. In some cases, our doctor might try to turn me around manually with pressure on your belly. This process is called external version and is moderately successful. Finally, mom you should now start getting ready for me to come out any time. Have you packed your bag for the hospital? And have you done the shopping when I arrive? If not yet, now is the time to get done with this.'
            },

            '36': {
                motherText: 'Dear mom, we are nearly there. Your visits to the doctor must have become weekly by now. You will sometimes feel very energetic and at other times very fatigued. Additionally, your breasts would be feeling a bit lumpy. That’s because your milk glands are expanding and filling with colostrum.',
                babyText: 'Mom, I am weighing close to 3 Kgs now. I am practicing to blink and have nearly developed my suckling muscles. After all, I am going to be hungry soon when I come out and want to be prepared for my 1st real feed. '
            },

            '37': {
                motherText: 'Dear mom, you will have noticed that uterus has remained the same size as it was couple of weeks ago as things have started stabilizing including the weight you would have gained during this period. Also, your doctor would perform a pelvic test to check how your pregnancy is progressing.',
                babyText: 'Mom, can I let you know a secret? I can already recognize your voice and once I am out, will be able to distinguish your sweet voice when you speak. I am now just waiting for the right time to come out in your arms. My skin is getting pinker and has lost its wrinkly appearance. I have also now started receiving antibodies from the umbilical cord. These will help me to strengthen my immunity and fight diseases.'
            },

            '38': {
                motherText: 'Dear mom, be prepared for your water to break any day now. Don’t worry if this happens when you are outside as the signs of water breaking are wetness running down your leg and not a sudden gush on the floor. Also, ensure that you have everything packed for the hospital as approximately 95% of babies are born within 2 weeks of due date.',
                babyText: 'Mom, do you remember about lanugo? The hair on my body which I told you about earlier. Well I’ve started losing the same so that I am nice and prim when I come out. I am now ready to come out anytime and would be considered a full-term infant. My brain, lungs, heart, stomach are now functioning well. But mom, I will miss the comfort of your womb and am enjoying my time to fullest now.'
            },

            '39': {
                motherText: 'Dear mom, you must be feeling quite uncomfortable as your uterus occupies the space of your pelvis and abdomen. Also, mom, I understand you must be on lookout for any chance of labor and every little spasm would make you wonder if “This is it!. Labor, as you must have been told, can begin in several ways. It could be either in form of mild cramps or water breaking or if you are having a scheduled induction or C-section.',
                babyText: 'Mom, I am now fully ready to come out but do understand it can take 1 or 2 more weeks in some cases. I have reached my birth height and weight and accumulated enough fat to survive outside your womb. I continue to receive nutrients and antibodies from your placenta to help me fend of diseases once I am born.'
            },

            '40': {
                motherText: 'Dear mom, the time has almost come. But please don’t worry if I am not born on the due date given to you. After all less than 5% of babies get born on their predicted due date. You might be facing difficulties in getting a comfortable sleep so don’t miss the opportunity of taking as much rest as possible with your feet up. Mom, I also want to let you know that once you are in your active labor, your contractions will become fast and furious and they will hurt, which you haven’t felt before. Remain strong during this period and ask for pain reliving epidural if you are unable to bear it.',
                babyText: 'Mom, do ensure that the labor room has a pediatrician to examine me once I am born. He/She would need to calculate my Apgar score – which is an initial measure of my health. Typical score for healthy babies lies between 7 and 9. During this measure, the doctor would grade me on following factors: activity and muscle tone, pulse (heart rate), grimace response (medically known as "reflex irritability"), appearance (skin coloration) and respiration (breathing rate and effort). On each factor I would be given a grade between 0 and 2.'
            },

            '41': {
                motherText: 'Dear mom, its ok if you are still pregnant as full term is defined as period between 38 and 42 weeks as 40 week due date is simply the mid-point during this period. If you have a scheduled delivery then you will be prepared for a C-section or given something to be induced for you deliver vaginally. Always keep the number of your doctor handy in case your water breaks suddenly.',
                babyText: 'Dear mom, I am ready to see you!'
            },

            '42': {
                motherText: 'Dear mom, technically I am not overdue until this week is over. I am safe and healthy in your womb. I am sure you are following your doctor’s advice of waiting till she recommends. She will know when to induce your labor and by the right means of either breaking your water or stripping your membranes or via drugs.',
                babyText: 'Dear mom, I can come at anytime!'
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