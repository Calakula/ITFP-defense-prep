// Page data for one source file: full code + step-by-step explanations (EN/RU/KK)
(window.F = window.F || []).push({id:"pipeline",name:"DeliveryPipeline.cs",
 what:{en:"Connects the three stages into one visible chain. This is the file to show when the teacher says “show me the pipeline”.",ru:"Соединяет три этапа в одну видимую цепочку. Именно этот файл надо показывать, когда преподаватель просит «покажите конвейер».",kk:"Үш кезеңді бір көрінетін тізбекке байланыстырады. Оқытушы «конвейерді көрсетіңіз» дегенде осы файлды көрсету керек."},
 code:`using System.Collections.Immutable;
namespace DeliveryQuotes.Core;

public static class DeliveryPipeline
{
    public static QuoteSummary Run(ImmutableArray<DeliveryRequest> requests, EligibilityRules rules, Func<DeliveryRequest, decimal> policy)
    {
        var eligible = PipelineStages.SelectEligible(requests, rules);
        var priced = PipelineStages.PriceRequests(eligible, policy);
        return PipelineStages.BuildSummary(priced, requests.Length - eligible.Length);
    }
}`,
 n:[
 {a:"public static QuoteSummary Run",n:1,en:"Three things go in: the orders, the limits, and the price rule. One thing comes out: the summary. Nothing else is read from anywhere, so the same input always gives the same output.",ru:"Внутрь идут три вещи: заказы, ограничения и правило цены. Наружу выходит одна: сводка. Больше ничего ниоткуда не читается, поэтому одинаковые входные данные всегда дают одинаковый результат.",kk:"Ішке үш нәрсе кіреді: тапсырыстар, шектеулер және баға ережесі. Сыртқа бір нәрсе шығады: қорытынды. Басқа еш жерден ештеңе оқылмайды, сондықтан бірдей кіріс әрқашан бірдей нәтиже береді."},
 {a:"var eligible",n:3,en:"The three steps in order. Stage 1 result goes into stage 2, stage 2 result goes into stage 3. The skipped count is simply “how many we had” minus “how many we kept”. To trace one order at the defense, follow it line by line through these three calls.",ru:"Три шага по порядку. Результат этапа 1 идёт в этап 2, результат этапа 2 — в этап 3. Число пропущенных — это просто «сколько было» минус «сколько осталось». Чтобы проследить один заказ на защите, пройдите по этим трём вызовам строка за строкой.",kk:"Үш қадам ретімен. 1-кезең нәтижесі 2-кезеңге, 2-кезең нәтижесі 3-кезеңге барады. Қалдырылғандар саны — жай «қанша болды» минус «қанша қалды». Қорғауда бір тапсырысты бақылау үшін осы үш шақыру арқылы жол-жолымен жүріңіз."}]});
