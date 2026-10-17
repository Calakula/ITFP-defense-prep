// Page data for one source file: full code + step-by-step explanations (EN/RU/KK)
(window.F = window.F || []).push({id:"program",name:"Program.cs (App)",
 what:{en:"The only place that touches the outside world: it reads the file, picks the policy from the command line, calls the pipeline and prints the result.",ru:"Единственное место, которое касается внешнего мира: читает файл, выбирает политику из командной строки, вызывает конвейер и печатает результат.",kk:"Сыртқы әлеммен жанасатын жалғыз орын: файлды оқиды, командалық жолдан саясатты таңдайды, конвейерді шақырады және нәтижені басып шығарады."},
 code:`using DeliveryQuotes.Core;

if (args.Length != 2)
{
    Console.Error.WriteLine("Usage: <csv-path> <standard|express|both>");
    return 64;
}

var path = args[0];
var mode = args[1].Trim().ToLowerInvariant();

var policyNames = mode == "both" ? new[] { "standard", "express" } : new[] { mode };
foreach (var name in policyNames)
{
    if (!PricingPolicies.TryGetByName(name, out _))
    {
        Console.Error.WriteLine($"Unknown policy '{args[1]}'. Use standard, express or both.");
        return 64;
    }
}

string[] lines;
try
{
    lines = File.ReadAllLines(path);
}
catch (Exception ex) when (ex is IOException or UnauthorizedAccessException)
{
    Console.Error.WriteLine($"Cannot read '{path}': {ex.Message}");
    return 1;
}

var report = RequestParser.ParseLines(lines);
if (!report.IsValid)
{
    Console.Error.WriteLine($"Input rejected, {report.Errors.Length} problem(s):");
    foreach (var error in report.Errors)
    {
        Console.Error.WriteLine($"  {error}");
    }
    return 2;
}

var totals = new List<decimal>();
foreach (var name in policyNames)
{
    PricingPolicies.TryGetByName(name, out var policy);
    var summary = DeliveryPipeline.Run(report.Requests, EligibilityRules.Default, policy!);
    Print(name, summary);
    totals.Add(summary.TotalPrice);
}

if (totals.Count == 2)
{
    Console.WriteLine($"Express minus standard total: {totals[1] - totals[0]:0} KZT");
}
return 0;

static void Print(string policyName, QuoteSummary summary)
{
    Console.WriteLine($"Policy: {policyName}");
    Console.WriteLine($"Quotes: {summary.Quotes.Length} (not eligible: {summary.SkippedCount})");
    foreach (var q in summary.Quotes)
    {
        Console.WriteLine($"  {q.Id,-6} {q.Customer,-10} {q.Price,7:0} KZT");
    }
    Console.WriteLine($"Total: {summary.TotalPrice:0} KZT");
    Console.WriteLine();
}`,
 n:[
 {a:"var path = args[0]",n:2,en:"args are the words typed after the program name in the terminal: the file path and the policy (standard, express or both). The program ends with a number: 0 means success, other numbers mean different kinds of failure (64 wrong arguments, 1 file unreadable, 2 invalid data).",ru:"args — это слова, введённые после имени программы в терминале: путь к файлу и политика (standard, express или both). Программа завершается числом: 0 означает успех, другие числа — разные виды ошибок (64 неверные аргументы, 1 файл не читается, 2 неверные данные).",kk:"args — терминалда бағдарлама атынан кейін терілген сөздер: файл жолы және саясат (standard, express немесе both). Бағдарлама санмен аяқталады: 0 — сәтті, басқа сандар — қателердің әртүрлі түрлері (64 дұрыс емес аргументтер, 1 файл оқылмайды, 2 дұрыс емес деректер)."},
 {a:"var report = RequestParser",n:9,en:"We parse the file. If even one line is bad, we print every problem and stop with code 2. No quotes are produced from bad data, so we never show a fake successful result.",ru:"Разбираем файл. Если хотя бы одна строка плохая, печатаем все проблемы и останавливаемся с кодом 2. Из плохих данных котировки не создаются, поэтому мы никогда не показываем ложный успешный результат.",kk:"Файлды талдаймыз. Тым болмаса бір жол нашар болса, барлық мәселені шығарып, 2 кодымен тоқтаймыз. Нашар деректерден баға ұсыныстары жасалмайды, сондықтан жалған сәтті нәтиже ешқашан көрсетілмейді."},
 {a:"var totals = new List<decimal>()",n:7,en:"For each chosen policy we call DeliveryPipeline.Run with the same orders. With “both” the same pipeline runs twice with two different rules, so you can see that only the prices change. Printing happens here, AFTER the calculation is finished.",ru:"Для каждой выбранной политики вызываем DeliveryPipeline.Run с теми же заказами. При «both» один и тот же конвейер работает дважды с двумя разными правилами, и видно, что меняются только цены. Печать происходит здесь, ПОСЛЕ окончания вычислений.",kk:"Таңдалған әр саясат үшін сол тапсырыстармен DeliveryPipeline.Run шақырамыз. «both» кезінде бір конвейер екі түрлі ережемен екі рет жұмыс істейді, тек бағалар өзгеретіні көрінеді. Басып шығару осында, есептеу АЯҚТАЛҒАННАН КЕЙІН жасалады."}]});
