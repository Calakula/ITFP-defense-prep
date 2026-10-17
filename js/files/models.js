// Page data for one source file: full code + step-by-step explanations (EN/RU/KK)
(window.F = window.F || []).push({id:"models",name:"Models.cs",
 what:{en:"Defines the “shapes” of data used everywhere: an order, the limits, a priced order, a quote, the final summary and the parse report. Nothing here does any work.",ru:"Описывает «формы» данных, которые используются везде: заказ, ограничения, заказ с ценой, котировка, итоговая сводка и отчёт парсера. Здесь нет никаких действий.",kk:"Барлық жерде қолданылатын деректердің «пішіндерін» сипаттайды: тапсырыс, шектеулер, бағасы бар тапсырыс, баға ұсынысы, қорытынды және парсер есебі. Мұнда ешқандай әрекет жоқ."},
 code:`using System.Collections.Immutable;
namespace DeliveryQuotes.Core;

public sealed record DeliveryRequest(string Id, string Customer, decimal DistanceKm, decimal WeightKg);

public sealed record EligibilityRules(decimal MaxDistanceKm, decimal MaxWeightKg)
{
    public static EligibilityRules Default { get; } = new(30m, 20m);
}

public sealed record PricedRequest(DeliveryRequest Request, decimal Price);
public sealed record Quote(string Id, string Customer, decimal Price);
public sealed record QuoteSummary(ImmutableArray<Quote> Quotes, decimal TotalPrice, int SkippedCount);

public sealed record ParseReport(ImmutableArray<DeliveryRequest> Requests, ImmutableArray<string> Errors)
{
    public bool IsValid => Errors.IsEmpty;
}`,
 n:[
 {a:"DeliveryRequest(",n:1,en:"A “record” is a small box of data. Once created, it cannot be changed, so no other part of the program can secretly alter it. This one holds one order: id, customer name, distance, weight. decimal is a number type that is exact for money and fractions.",ru:"«record» — это маленькая коробочка с данными. После создания её нельзя изменить, поэтому никакая другая часть программы не может тайно её испортить. Эта хранит один заказ: id, имя клиента, расстояние, вес. decimal — числовой тип, точный для денег и дробей.",kk:"«record» — деректері бар кішкентай қорап. Жасалғаннан кейін оны өзгертуге болмайды, сондықтан бағдарламаның басқа бөлігі оны жасырын бұза алмайды. Бұл біреуі бір тапсырыстың деректерін сақтайды: id, клиент аты, қашықтық, салмақ. decimal — ақша мен бөлшектер үшін нақты сан түрі."},
 {a:"EligibilityRules(",n:4,en:"The service limits (30 km, 20 kg) live in a value that we pass into the pipeline. They are not hidden inside it. To change the rule, you change 30m or 20m here, or pass a different EligibilityRules.",ru:"Ограничения сервиса (30 км, 20 кг) лежат в значении, которое мы передаём в конвейер. Они не спрятаны внутри него. Чтобы изменить правило, поменяйте 30m или 20m здесь или передайте другой EligibilityRules.",kk:"Қызмет шектеулері (30 км, 20 кг) конвейерге беретін мәнде тұрады. Олар конвейер ішінде жасырылмаған. Ережені өзгерту үшін мұнда 30m немесе 20m мәнін ауыстырыңыз немесе басқа EligibilityRules беріңіз."},
 {a:"QuoteSummary",n:1,en:"The final answer: the list of quotes, the total price, and how many orders were skipped because they were too far or too heavy.",ru:"Итоговый ответ: список котировок, общая цена и сколько заказов пропущено из-за слишком большого расстояния или веса.",kk:"Қорытынды жауап: баға ұсыныстарының тізімі, жалпы баға және тым алыс не тым ауыр болғандықтан қалдырылған тапсырыс саны."},
 {a:"ParseReport",n:4,en:"What the parser returns: the good orders plus a list of error messages. IsValid is true only when there are no errors at all.",ru:"Что возвращает парсер: корректные заказы и список сообщений об ошибках. IsValid равно true только когда ошибок нет совсем.",kk:"Парсер қайтаратын нәрсе: дұрыс тапсырыстар және қате хабарламаларының тізімі. IsValid тек қате мүлде болмаған жағдайда ғана true болады."}]});
