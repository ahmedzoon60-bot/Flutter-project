import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/program.dart';
import '../services/api_service.dart';
import '../widgets/program_card.dart';

class ProgramListScreen extends StatefulWidget {
  const ProgramListScreen({Key? key}) : super(key: key);

  @override
  State<ProgramListScreen> createState() => _ProgramListScreenState();
}

class _ProgramListScreenState extends State<ProgramListScreen> {
  final ApiService _apiService = ApiService();
  late Future<List<Program>> _futurePrograms;
  List<Program> _allPrograms = [];
  List<Program> _filteredPrograms = [];
  String _searchQuery = '';
  String? _lastVisitedTitle;
  int? _lastVisitedId;

  @override
  void initState() {
    super.initState();
    _loadPrograms();
    _loadLastVisited();
  }

  void _loadPrograms() {
    _futurePrograms = _apiService.fetchPrograms().then((programs) {
      setState(() {
        _allPrograms = programs;
        _filterPrograms();
      });
      return programs;
    });
  }

  Future<void> _refreshPrograms() async {
    _loadPrograms();
    await _futurePrograms;
  }

  Future<void> _loadLastVisited() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      setState(() {
        _lastVisitedId = prefs.getInt('last_visited_id');
        _lastVisitedTitle = prefs.getString('last_visited_title');
      });
    } catch (e) {
      debugPrint('Error loading last visited program: $e');
    }
  }

  void _filterPrograms() {
    if (_searchQuery.isEmpty) {
      _filteredPrograms = _allPrograms;
    } else {
      _filteredPrograms = _allPrograms
          .where((p) => p.title.toLowerCase().contains(_searchQuery.toLowerCase()))
          .toList();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Nutritional Programs'),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.feedback_outlined),
            tooltip: 'Provide Feedback',
            onPressed: () {
              Navigator.pushNamed(context, '/feedback');
            },
          ),
        ],
      ),
      body: Column(
        children: [
          // Search input bar
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Search programs by title...',
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                contentPadding: const EdgeInsets.symmetric(vertical: 8),
              ),
              onChanged: (value) {
                setState(() {
                  _searchQuery = value;
                  _filterPrograms();
                });
              },
            ),
          ),

          // Last visited program banner
          if (_lastVisitedTitle != null)
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 16, bottom: 8),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.primaryContainer.withOpacity(0.4),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: Theme.of(context).colorScheme.primary.withOpacity(0.2),
                ),
              ),
              child: Row(
                children: [
                  Icon(
                    Icons.history,
                    color: Theme.of(context).colorScheme.primary,
                    size: 20,
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Last Visited Program:',
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                            color: Colors.grey,
                          ),
                        ),
                        Text(
                          '$_lastVisitedTitle (ID: $_lastVisitedId)',
                          style: const TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w600,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.close, size: 16),
                    onPressed: () async {
                      final prefs = await SharedPreferences.getInstance();
                      await prefs.remove('last_visited_id');
                      await prefs.remove('last_visited_title');
                      setState(() {
                        _lastVisitedId = null;
                        _lastVisitedTitle = null;
                      });
                    },
                  ),
                ],
              ),
            ),

          // FutureBuilder list view with Pull-to-refresh
          Expanded(
            child: FutureBuilder<List<Program>>(
              future: _futurePrograms,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting &&
                    _allPrograms.isEmpty) {
                  return const Center(child: CircularProgressIndicator());
                } else if (snapshot.hasError && _allPrograms.isEmpty) {
                  return Center(
                    child: Padding(
                      padding: const EdgeInsets.all(24.0),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(
                            Icons.error_outline,
                            color: Colors.red,
                            size: 48,
                          ),
                          const SizedBox(height: 16),
                          const Text(
                            'Failed to Load Programs',
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            snapshot.error.toString(),
                            textAlign: Center,
                            style: const TextStyle(color: Colors.grey),
                          ),
                          const SizedBox(height: 16),
                          ElevatedButton(
                            onPressed: _loadPrograms,
                            child: const Text('Retry Fetch'),
                          ),
                        ],
                      ),
                    ),
                  );
                }

                if (_filteredPrograms.isEmpty) {
                  return const Center(
                    child: Text('No programs match your search query.'),
                  );
                }

                return RefreshIndicator(
                  onRefresh: _refreshPrograms,
                  child: ListView.builder(
                    itemCount: _filteredPrograms.length,
                    itemBuilder: (context, index) {
                      final program = _filteredPrograms[index];
                      return ProgramCard(
                        program: program,
                        onTap: () async {
                          // Save last visited program
                          try {
                            final prefs = await SharedPreferences.getInstance();
                            await prefs.setInt('last_visited_id', program.id);
                            await prefs.setString('last_visited_title', program.title);
                          } catch (e) {
                            debugPrint('Error storing last visited: $e');
                          }

                          // Refresh state to update banner and navigate
                          _loadLastVisited();

                          Navigator.pushNamed(
                            context,
                            '/details',
                            arguments: program,
                          );
                        },
                      );
                    },
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
